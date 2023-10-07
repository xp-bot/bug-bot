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
const discord_js_1 = require("discord.js");
const slash = new builders_1.SlashCommandBuilder()
    .setDefaultMemberPermissions(0)
    .setName(`message`)
    .setDescription(`Create the "Open Ticket" message.`);
module.exports = {
    slash,
    execute
};
function execute(interaction) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        interaction.reply({ ephemeral: true, content: `Created Message!` });
        (_a = interaction.channel) === null || _a === void 0 ? void 0 : _a.send({
            embeds: [
                new discord_js_1.MessageEmbed()
                    .setTitle(`Official XP Support`)
                    .setDescription(`We are here to help!`)
                    .setColor(`#52D94F`)
            ],
            components: [
                new discord_js_1.MessageActionRow().addComponents(new discord_js_1.MessageButton()
                    .setCustomId('openTicket')
                    .setLabel('Open a Ticket')
                    .setStyle('SUCCESS')
                    .setEmoji(`<:xp_check:818532849564909658>`))
            ]
        });
    });
}
