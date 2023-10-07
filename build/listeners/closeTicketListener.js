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
const discord_js_1 = require("discord.js");
function closeTicketListener(interaction) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        if (((_a = interaction.channel) === null || _a === void 0 ? void 0 : _a.type) !== `GUILD_TEXT` ||
            !((_b = interaction.channel) === null || _b === void 0 ? void 0 : _b.name.startsWith(`ticket-`))) {
            interaction.reply({
                ephemeral: true,
                embeds: [
                    new discord_js_1.MessageEmbed()
                        .setColor('RED')
                        .setTitle(`Invalid Ticket`)
                        .setDescription(`Could not resolve ticket. :/`)
                ]
            });
            return;
        }
        interaction.reply({
            embeds: [
                new discord_js_1.MessageEmbed()
                    .setTitle(`Ticket closed`)
                    .setDescription(`${interaction.user} closed the Ticket!`)
                    .setColor(`#52D94F`)
            ]
        });
        if (((_c = interaction.channel) === null || _c === void 0 ? void 0 : _c.type) === `GUILD_TEXT`) {
            interaction.channel.setParent(process.env.ARCHIVE_CATEGORY || '', {
                lockPermissions: false
            });
            interaction.channel.permissionOverwrites.set([
                {
                    id: process.env.SUPPORT_ROLE || '',
                    allow: ['SEND_MESSAGES', `VIEW_CHANNEL`]
                },
                {
                    id: `707242215579189279`,
                    deny: ['SEND_MESSAGES', `VIEW_CHANNEL`]
                }
            ]);
            interaction.channel.setName(interaction.channel.name.replace(`ticket-`, `closed-`));
        }
    });
}
exports.default = closeTicketListener;
