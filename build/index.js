"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const setup_json_1 = __importDefault(require("./setup.json"));
const readyListener_1 = require("./listeners/readyListener");
const winston_1 = __importStar(require("winston"));
const commandsListener_1 = __importDefault(require("./listeners/commandsListener"));
const closeTicketListener_1 = __importDefault(require("./listeners/closeTicketListener"));
const ticketHandler_1 = __importDefault(require("./handlers/ticketHandler"));
const openTicketListener_1 = require("./listeners/openTicketListener");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: `.env` });
global.setup = setup_json_1.default;
global.botClient = new discord_js_1.Client({
    intents: [
        discord_js_1.Intents.FLAGS.GUILDS,
        discord_js_1.Intents.FLAGS.GUILD_MEMBERS,
        discord_js_1.Intents.FLAGS.GUILD_MESSAGES,
        discord_js_1.Intents.FLAGS.GUILD_MESSAGE_REACTIONS
    ]
});
global.logger = winston_1.default.createLogger({
    level: 'info',
    format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.json()),
    transports: [
        new winston_1.default.transports.File({ filename: 'error.log', level: 'error' }),
        new winston_1.default.transports.File({ filename: 'out.log' })
    ]
});
// if (process.env.NODE_ENV !== 'production') {
logger.add(new winston_1.transports.Console({
    format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.simple())
}));
// }
process
    .on('unhandledRejection', (reason, p) => {
    logger.error('Unhandled Rejection at Promise', reason, p);
})
    .on('uncaughtException', (err) => {
    logger.error('Uncaught Exception thrown', err);
    process.exit(1);
});
botClient.once('ready', () => __awaiter(void 0, void 0, void 0, function* () {
    (0, readyListener_1.readyListener)();
    (0, ticketHandler_1.default)();
}));
botClient.on('threadCreate', (thread) => __awaiter(void 0, void 0, void 0, function* () {
    if (thread.parentId === process.env.GET_HELP_FORUM_CHANNEL) {
        thread.send({
            content: `## Thank you for getting in touch!\n<@&${process.env.SUPPORT_ROLE}> will assist you shortly.\n\n> _To expedite the process, please provide us with the following information:_\n> - Your server ID.\n> - Screenshots illustrating the issue.\n> - A detailed explanation of how you encountered the problem you're currently facing.`
        });
    }
}));
botClient.on('interactionCreate', (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    if (!interaction.isCommand() || interaction.user.bot)
        return;
    (0, commandsListener_1.default)(interaction);
}));
botClient.on('interactionCreate', (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    if (!interaction.isButton() || interaction.user.bot)
        return;
    switch (interaction.customId) {
        case `openTicket`:
            (0, openTicketListener_1.openTicketButtonListener)(interaction);
            break;
        case `closeTicket`:
            (0, closeTicketListener_1.default)(interaction);
            break;
    }
}));
botClient.on('interactionCreate', (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    if (!interaction.isModalSubmit() || interaction.user.bot)
        return;
    switch (interaction.customId) {
        case `openTicketModal`:
            (0, openTicketListener_1.openTicketModalListener)(interaction);
            break;
    }
}));
botClient.login(process.env.TOKEN);
