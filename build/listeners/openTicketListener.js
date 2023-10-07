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
exports.openTicketModalListener = exports.openTicketButtonListener = void 0;
const discord_js_1 = require("discord.js");
const uSetup_1 = require("../utilities/uSetup");
function openTicketButtonListener(interaction) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        (_a = interaction.channel) === null || _a === void 0 ? void 0 : _a.type;
        const modal = new discord_js_1.Modal()
            .setCustomId('openTicketModal')
            .setTitle('Tell us, whats the issue?');
        const problemOrigin = new discord_js_1.TextInputComponent()
            .setCustomId('ticketModalProblemOrigin')
            .setLabel('What service do you have issues with?')
            .setPlaceholder(`Bot / Dashboard / Setup / ...`)
            .setRequired(true)
            .setMaxLength(15)
            .setMinLength(2)
            .setStyle('SHORT');
        const problemID = new discord_js_1.TextInputComponent()
            .setCustomId('ticketModalProblemID')
            .setLabel('Please provide the ID of the affected Server.')
            .setPlaceholder(`830251635490564524`)
            .setMaxLength(18)
            .setMinLength(17)
            .setRequired(false)
            .setStyle('SHORT');
        const problemDetails = new discord_js_1.TextInputComponent()
            .setCustomId('ticketModalProblemDetails')
            .setLabel('Describe your issue as detailed as possible.')
            .setPlaceholder(`My problem is...`)
            .setRequired(true)
            .setMaxLength(1000)
            .setMinLength(25)
            .setStyle('PARAGRAPH');
        const materialLinks = new discord_js_1.TextInputComponent()
            .setCustomId('ticketModalProblemMaterial')
            .setLabel('Attach material in the form of screenshots.')
            .setPlaceholder(`https://imgur.com/EZUt6sz\nhttps://imgur.com/gallery/UmaLaZS`)
            .setMaxLength(1000)
            .setRequired(false)
            .setStyle('PARAGRAPH');
        const firstActionRow = new discord_js_1.MessageActionRow().addComponents(problemOrigin);
        const idActionRow = new discord_js_1.MessageActionRow().addComponents(problemID);
        const secondActionRow = new discord_js_1.MessageActionRow().addComponents(problemDetails);
        const thirdActionRow = new discord_js_1.MessageActionRow().addComponents(materialLinks);
        // Add inputs to the modal
        modal.addComponents(firstActionRow, idActionRow, secondActionRow, thirdActionRow);
        // Show the modal to the user
        yield interaction.showModal(modal);
    });
}
exports.openTicketButtonListener = openTicketButtonListener;
function openTicketModalListener(interaction) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const issueOrigin = interaction.fields.getTextInputValue(`ticketModalProblemOrigin`);
        const issueServerID = interaction.fields.getTextInputValue(`ticketModalProblemID`);
        const issueDetails = interaction.fields.getTextInputValue(`ticketModalProblemDetails`);
        const issueLinks = interaction.fields.getTextInputValue(`ticketModalProblemMaterial`);
        setup.ticketCount++;
        (0, uSetup_1.backupSetupFile)();
        let num = `${setup.ticketCount}`;
        while (num.length < 4) {
            num = `0${num}`;
        }
        const infoEmbed = new discord_js_1.MessageEmbed()
            .setTitle(`Details of Ticket ${num}`)
            .setDescription(`> ${issueDetails.replace(/\n/gm, `\n> `)}`)
            .setFooter({
            text: `Origin of the Issue: ${issueOrigin || `/`} | ServerID: ${issueServerID || `/`}`
        })
            .setColor(`#52D94F`);
        if (issueLinks && issueLinks.length > 0)
            infoEmbed.addField(`Issue Material`, `${issueLinks.split(` `).join(`\n`)}`, false);
        (_a = interaction.guild) === null || _a === void 0 ? void 0 : _a.channels.create(`ticket-${num}`, {
            type: 'GUILD_TEXT',
            parent: `${process.env.TICKET_CATEGORY}`,
            reason: `BugBot Ticket System`,
            permissionOverwrites: [
                {
                    id: interaction.user.id,
                    allow: ['SEND_MESSAGES', `VIEW_CHANNEL`]
                },
                {
                    id: process.env.SUPPORT_ROLE || '',
                    allow: ['SEND_MESSAGES', `VIEW_CHANNEL`]
                },
                {
                    id: interaction.guild.roles.everyone.id,
                    deny: ['SEND_MESSAGES', `VIEW_CHANNEL`]
                }
            ]
        }).then((channel) => __awaiter(this, void 0, void 0, function* () {
            yield channel.send({
                embeds: [
                    new discord_js_1.MessageEmbed()
                        .setTitle(`Thank you for creating a Ticket!`)
                        .setDescription(`We are reviewing your information...\n**The Support Team will be with you shortly.**\n\nHave a nice day! <:xpfeaturesmith:851213538440904755>`)
                        .setColor(`#52D94F`),
                    infoEmbed
                ],
                components: [
                    new discord_js_1.MessageActionRow().addComponents(new discord_js_1.MessageButton()
                        .setCustomId('closeTicket')
                        .setLabel('Close the Ticket')
                        .setStyle('SUCCESS')
                        .setEmoji(`🔒`))
                ],
                content: `**Welcome <@${interaction.user.id}>** | <@&${process.env.SUPPORT_ROLE}>`
            });
        }));
        interaction.reply({
            ephemeral: true,
            content: `Created Ticket \`ticket-${num}\`!`
        });
    });
}
exports.openTicketModalListener = openTicketModalListener;
