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
Object.defineProperty(exports, "__esModule", { value: true });
function commandsListener(interaction) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!interaction.guildId)
            return;
        const { commandName } = interaction;
        const found = botCommands.find((cmd) => cmd.slash.name === commandName);
        if (!found)
            return;
        try {
            yield found.execute(interaction);
        }
        catch (error) {
            logger.error(`Error when running Command ${commandName}`, error);
        }
    });
}
exports.default = commandsListener;
