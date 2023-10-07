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
    .setName(`close`)
    .addUserOption((o) => o
    .setName(`user`)
    .setDescription(`The User that created this ticket.`)
    .setRequired(true))
    .setDescription(`Close a ticket.`);
module.exports = {
    slash,
    execute
};
function execute(interaction) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        if (((_a = interaction.channel) === null || _a === void 0 ? void 0 : _a.type) !== `GUILD_TEXT` || !interaction.channel.name.startsWith(`ticket-`))
            return;
        const messages = yield ((_b = interaction.channel) === null || _b === void 0 ? void 0 : _b.messages.fetch());
        let ticketUser = ((_c = messages === null || messages === void 0 ? void 0 : messages.last()) === null || _c === void 0 ? void 0 : _c.mentions.users.first()) ||
            interaction.options.getUser(`user`);
        interaction.reply({ ephemeral: true, content: `Sent Close Prompt!` });
        const message = yield interaction.channel.send({
            content: ticketUser ? `${ticketUser}` : undefined,
            embeds: [
                new discord_js_1.MessageEmbed()
                    .setTitle(`Hey ${ticketUser ? `${ticketUser.username}` : `👋`}`)
                    .setDescription(`**Do you still need support?**\nIf so, please explain your problem here as detailed as possible, so that our team can help you quickly and efficiently.`)
                    .setFooter({ text: `Or go ahead and 🔒 the ticket.` })
                    .setColor(`#52D94F`)
            ],
            components: [
                new discord_js_1.MessageActionRow().addComponents(new discord_js_1.MessageButton()
                    .setCustomId('closeTicket')
                    .setLabel('Close the Ticket')
                    .setStyle('SUCCESS')
                    .setEmoji(`🔒`))
            ]
        });
        const filter = (i) => i.customId === `closeTicket`;
        const collector = message.createMessageComponentCollector({ filter: filter, max: 1 });
        collector.on(`collect`, (i) => {
            interaction
                .editReply({
                components: []
            })
                .catch((err) => { });
        });
    });
}
