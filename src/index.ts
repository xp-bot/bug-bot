import { Client, Intents } from 'discord.js';
import c from './config.json';
import s from './setup.json';
import { CommandInterface } from './interfaces/internalInterfaces';
import { readyListener } from './listeners/readyListener';
import winston, { format, transports } from 'winston';
import commandsListener from './listeners/commandsListener';
import openTickerListener from './listeners/openTicketListener';

declare global {
  var botClient: Client;
  var botCommands: CommandInterface[];
  var config: typeof c;
  var setup: typeof s;
  var logger: winston.Logger;
}

global.config = c;
global.botClient = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS]
});

global.logger = winston.createLogger({
  level: 'info',
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'out.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple())
    })
  );
}

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
});

botClient.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand() || interaction.user.bot) return;

  commandsListener(interaction);
});

botClient.on('interactionCreate', async (interaction) => {
  if (!interaction.isButton() || interaction.user.bot) return;
  console.log(interaction.customId);
  
  if (interaction.customId === `openTicket`) openTickerListener(interaction);
});

botClient.login(config.token);
