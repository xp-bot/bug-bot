import { Client, Intents } from 'discord.js';
import c from './config.json';
import s from './setup.json';
import { CommandInterface } from './interfaces/internalInterfaces';
import { readyListener } from './listeners/readyListener';
import winston, { format, transports } from 'winston';
import commandsListener from './listeners/commandsListener';
import closeTicketListener from './listeners/closeTicketListener';
import bugAssigner from './handlers/bugHandler';
import ticketHandler from './handlers/ticketHandler';
import {
  openTicketButtonListener,
  openTicketModalListener
} from './listeners/openTicketListener';

declare global {
  var botClient: Client;
  var botCommands: CommandInterface[];
  var config: typeof c;
  var setup: typeof s;
  var logger: winston.Logger;
}

global.config = c;
global.setup = s;
global.botClient = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS
  ]
});

global.logger = winston.createLogger({
  level: 'info',
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'out.log' })
  ]
});

// if (process.env.NODE_ENV !== 'production') {
logger.add(
  new transports.Console({
    format: format.combine(format.colorize(), format.simple())
  })
);
// }

process
  .on('unhandledRejection', (reason, p) => {
    logger.error('Unhandled Rejection at Promise', reason, p);
  })
  .on('uncaughtException', (err) => {
    logger.error('Uncaught Exception thrown', err);
    process.exit(1);
  });

botClient.once('ready', async () => {
  readyListener();
  bugAssigner();
  ticketHandler();
});

botClient.on('threadCreate', async (thread) => {
  if (thread.parentId === config.channels.forum.channel) {
    thread.send({
      content: `<@&${config.supportRole}> Will be with you shortly!\n\n• Please include your Server ID and Screenshots if possible.`
    });
  }
});

botClient.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand() || interaction.user.bot) return;

  commandsListener(interaction);
});

botClient.on('interactionCreate', async (interaction) => {
  if (!interaction.isButton() || interaction.user.bot) return;
  switch (interaction.customId) {
    case `openTicket`:
      openTicketButtonListener(interaction);
      break;
    case `closeTicket`:
      closeTicketListener(interaction);
      break;
  }
});

botClient.on('interactionCreate', async (interaction) => {
  if (!interaction.isModalSubmit() || interaction.user.bot) return;
  switch (interaction.customId) {
    case `openTicketModal`:
      openTicketModalListener(interaction);
      break;
  }
});

botClient.login(config.token);
