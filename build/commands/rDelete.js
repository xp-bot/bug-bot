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
const builders_1 = require("@discordjs/builders");
const slash = new builders_1.SlashCommandBuilder()
    .setDefaultMemberPermissions(0)
    .setName(`delete`)
    .setDescription(`Delete all closed tickets.`);
module.exports = {
    slash,
    execute
};
function execute(interaction) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        (_a = interaction.guild) === null || _a === void 0 ? void 0 : _a.channels.cache.forEach((element) => {
            if (element.name.startsWith(`closed-`))
                element.delete();
        });
        interaction.reply({ ephemeral: true, content: `Deleted!` });
    });
}
