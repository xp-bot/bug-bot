import { Client, IntentsBitField } from 'discord.js';
import s from './setup.json';
import { CommandInterface } from './interfaces/internalInterfaces';
import { readyListener } from './listeners/readyListener';
import winston, { format, transports } from 'winston';
import commandsListener from './listeners/commandsListener';
import closeTicketListener from './listeners/closeTicketListener';
import ticketHandler from './handlers/ticketHandler';
import {
    openTicketButtonListener,
    openTicketModalListener
} from './listeners/openTicketListener';
import dotenv from "dotenv";
dotenv.config({ path: `.env` });

declare global {
    var botClient: Client;
    var botCommands: CommandInterface[];
    var setup: typeof s;
    var logger: winston.Logger;
}

global.setup = s;
global.botClient = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildMessageReactions
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
    ticketHandler();
});

botClient.on('threadCreate', async (thread) => {
    if (thread.parentId === process.env.GET_HELP_FORUM_CHANNEL) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await thread.join();
        await thread.send({
            content: `## Thank you for getting in touch!\n<@&${process.env.SUPPORT_ROLE}> will assist you shortly.\n\n> _To expedite the process, please provide us with the following information:_\n> - Your server ID.\n> - Screenshots illustrating the issue.\n> - A detailed explanation of how you encountered the problem you're currently facing.`
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

botClient.login(process.env.TOKEN);