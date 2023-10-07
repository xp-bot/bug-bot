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
    .setName(`lock`)
    .setDescription(`Lock a support Thread.`)
    .addStringOption((o) => o
    .setName(`reason`)
    .setRequired(false)
    .setDescription(`Specify a reason for the close.`)
    .addChoices({ name: `OP has been unresponsive.`, value: `opUnresponsive` }, { name: `Issue was solved.`, value: `issueSolved` }));
module.exports = {
    slash,
    execute
};
function execute(interaction) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        if (((_a = interaction.channel) === null || _a === void 0 ? void 0 : _a.type) === `GUILD_PUBLIC_THREAD`) {
            const embed = new discord_js_1.MessageEmbed()
                .setColor(`#52D94F`)
                .setTitle('This Thread has been closed by a Staff member.');
            const closeReason = interaction.options.getString(`reason`);
            if (closeReason) {
                switch (closeReason) {
                    case `opUnresponsive`:
                        embed.setDescription('**Reason:**\n> OP has been unresponsive.');
                        break;
                    case `issueSolved`:
                        embed.setDescription('**Reason:**\n> The original issue was solved.');
                        break;
                }
            }
            interaction.reply({ content: `Locked Thread!`, ephemeral: true });
            yield interaction.channel.send({ embeds: [embed] });
            yield interaction.channel.setLocked(true, `Locked by ${(_b = interaction.member) === null || _b === void 0 ? void 0 : _b.user.username} because "${closeReason || `unspecified`}"`);
            yield interaction.channel.setArchived(true, `Closed after lock by ${(_c = interaction.member) === null || _c === void 0 ? void 0 : _c.user.username}.`);
        }
    });
}
