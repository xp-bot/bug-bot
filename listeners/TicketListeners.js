const Discord = require('discord.js');
const Config = require('../config.json');
const SetupConfig = require('../setup.json');

/**
 * 
 * @param {Discord.MessageReaction} reaction
 * @param {Discord.User} user
 */
module.exports.ticketBeginHandler = (reaction, user) => {
    if (!reaction) return;
    if (reaction.message.id != SetupConfig.ticket_starter_id) return;

    switch (reaction.emoji.id) {
        case `818532849564909658`:
            SetupConfig.ticket_count++;
            let num = `${SetupConfig.ticket_count}`;
            while (num.length < 4) {
                num = `0${num}`
            }
            reaction.message.guild.channels.create(`ticket-${num}`, {
                type: 'text',
                parent: `${SetupConfig.ticket_category}`,
                reason: `BugBot Ticket System`,
                permissionOverwrites: [{
                    id: user.id,
                    allow: ['SEND_MESSAGES', `VIEW_CHANNEL`]
                }, {
                    id: Config.supportRole,
                    allow: ['SEND_MESSAGES', `VIEW_CHANNEL`]
                }, {
                    id: `707242215579189279`,
                    deny: ['SEND_MESSAGES', `VIEW_CHANNEL`]
                }]
            }).then(async (channel) => {
                // channel.send()
                // await channel.send(new Discord.MessageEmbed().setTitle(`Vacation Notice`).setDescription(`**The main development team is currently on vacation.\n\nTickets will probably be answered later than usual and bugs will not be fixed until July 15 at the earliest.**\n\nThank you for your understanding!`).setColor(`#52D94F`));
                const emb = await channel.send(`Welcome ${user} | <@&${Config.supportRole}>`, new Discord.MessageEmbed().setTitle(`Thank you for creating a Ticket`).setDescription(`\nSupport will be with you shortly.\n**Please use this time to describe your issue as detailed as possible.**\n\nHave a nice day! <:xpfeaturesmith:851213538440904755>`).setFooter(`React with 🔒 to close the ticket.`).setColor(`#52D94F`));
                emb.react(`🔒`);
            });
            break;
    }
    reaction.users.remove(user.id);
}

/**
 * 
 * @param {Discord.Message} message
 */
module.exports.assignHandler = async (message) => {
    if (message.member.user.bot) return;
    if (!(message.channel.name.startsWith(`ticket-`) && !isNaN(message.channel.name.slice(7).trim()))) return;
    await message.member.fetch();
    if (!message.member.roles.cache.has(Config.supportRole)) return;
    if (message.channel.type != `text`) return;

    let title = message.channel.name;
    if (aliases[message.member.id]) {
        title += `-${aliases[message.member.id]}`;
    } else {
        title += `-${message.member.user.username}`;
    }
    message.channel.setName(title);
}

/**
 * 
 * @param {Discord.MessageReaction} reaction
 * @param {Discord.User} user
 */
module.exports.closeTicketHanlder = async (reaction, user) => {
    if (user.bot || reaction.message.author.id != reaction.client.user.id) return;
    if (!reaction.message.channel.name.startsWith(`ticket-`)) return;
    if (reaction.message.channel.type != `text`) return;

    if (reaction.emoji.name != `🔒`) return;

    reaction.message.channel.send(new Discord.MessageEmbed().setDescription(`${user} closed the Ticket.`).setColor(`#52D94F`).setTitle(`Ticket closed`));
    reaction.message.channel.setParent(SetupConfig.archive_category, {
        lockPermissions: false
    });
    reaction.message.channel.overwritePermissions([{
        id: user.id,
        deny: ['SEND_MESSAGES', `VIEW_CHANNEL`]
    }, {
        id: Config.supportRole,
        allow: ['SEND_MESSAGES', `VIEW_CHANNEL`]
    }, {
        id: `707242215579189279`,
        deny: ['SEND_MESSAGES', `VIEW_CHANNEL`]
    }])
    reaction.message.reactions.removeAll();
    reaction.message.channel.setName(reaction.message.channel.name.replace(`ticket-`, `closed-`));
}