"use strict";
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
exports.registerGuildCommands = exports.readyListener = void 0;
const fs_1 = __importDefault(require("fs"));
const rest_1 = require("@discordjs/rest");
const path_1 = __importDefault(require("path"));
const v10_1 = require("discord-api-types/v10");
function readyListener() {
    return __awaiter(this, void 0, void 0, function* () {
        logger.info(`Booted!`);
        yield registerGuildCommands();
    });
}
exports.readyListener = readyListener;
function registerGuildCommands() {
    return __awaiter(this, void 0, void 0, function* () {
        const commands = [];
        const botCommands = [];
        const commandFiles = yield fetchFiles(`./build/commands`);
        if (!botClient.user) {
            logger.error(`Bot User is null??`);
            return;
        }
        // Place your client and guild ids here
        for (const file of commandFiles) {
            const command = require(`../${file.filepath.replace(`build`, ``)}`);
            const discordCommand = command.slash.toJSON();
            if (!command.developerOnly) {
                commands.push(discordCommand);
                botCommands.push(command);
            }
        }
        global.botCommands = botCommands;
        if (!process.env.TOKEN)
            process.exit(1);
        const rest = new rest_1.REST({ version: "9" }).setToken(process.env.TOKEN);
        (() => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                logger.info(`Started refreshing application (/) commands.`);
                yield rest.put(v10_1.Routes.applicationGuildCommands(((_a = botClient.user) === null || _a === void 0 ? void 0 : _a.id) || ``, process.env.GUILD || ''), {
                    // await rest.put(Routes.applicationCommands(clientId), {
                    body: commands,
                });
                logger.info(`Successfully reloaded application (/) commands.`);
            }
            catch (error) {
                logger.error(`Could not register commands:`, error);
            }
        }))();
    });
}
exports.registerGuildCommands = registerGuildCommands;
const fetchFiles = (targetPath) => __awaiter(void 0, void 0, void 0, function* () {
    const files = yield fs_1.default.promises.readdir(targetPath);
    const fetchedFiles = [];
    for (const file of files) {
        try {
            const filepath = path_1.default.join(targetPath, file);
            const stats = yield fs_1.default.promises.lstat(filepath);
            if (stats.isFile()) {
                fetchedFiles.push({
                    filepath,
                });
            }
            if (stats.isDirectory()) {
                const childFiles = yield fs_1.default.promises.readdir(filepath);
                files.push(...childFiles.map((f) => path_1.default.join(file, f)));
            }
        }
        catch (err) {
            logger.error(err);
        }
    }
    return fetchedFiles;
});
