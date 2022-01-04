import {User, MessageReaction, Message, MessageEmbed, Channel} from "discord.js";
import config from "../config.json"

module.exports.ticketBeginHandler = (reaction: MessageReaction, user: User) => {
    if (!reaction) return;
    if (reaction.message.id != config.ticketing.startId) return;

    switch (reaction.emoji.id) {
        case `818532849564909658`:
            config.ticketing.count++;
            let num = `${config.ticketing.count}`;
            while (num.length < 4) {
                num = `0${num}`
            }
            reaction.message.guild.channels.create(`ticket-${num}`, {
                type: 'text',
                parent: `${config.ticketing.category}`,
                reason: `BugBot Ticket System`,
                permissionOverwrites: [{
                    id: user.id,
                    allow: ['SEND_MESSAGES', `VIEW_CHANNEL`]
                }, {
                    id: config.supportRole,
                    allow: ['SEND_MESSAGES', `VIEW_CHANNEL`]
                }, {
                    id: `707242215579189279`,
                    deny: ['SEND_MESSAGES', `VIEW_CHANNEL`]
                }]
            }).then(async (channel: Channel) => {
                // channel.send()
                // await channel.send(new Discord.MessageEmbed().setTitle(`Vacation Notice`).setDescription(`**The main development team is currently on vacation.\n\nTickets will probably be answered later than usual and bugs will not be fixed until July 15 at the earliest.**\n\nThank you for your understanding!`).setColor(`#52D94F`));
                const emb = await channel.send({content: `Welcome ${user} | <@&${config.supportRole}>`, embeds: [new MessageEmbed().setTitle(`Thank you for creating a Ticket`).setDescription(`\nSupport will be with you shortly.\n**Please use this time to describe your issue as detailed as possible.**\n\nHave a nice day! <:xpfeaturesmith:851213538440904755>`).setFooter(`React with 🔒 to close the ticket.`).setColor(`#52D94F`)]});
                emb.react(`🔒`);
            });
            break;
    }
    reaction.users.remove(user.id);
}

module.exports.assignHandler = async (message: Message) => {
    if (message.member?.user.bot) return;
    if (!(message.channel.name.startsWith(`ticket-`) && !isNaN(message.channel.name.slice(7).trim()))) return;
    await message.member?.fetch();
    if (!message.member?.roles.cache.has(config.supportRole)) return;
    if (message.channel.type?.toString() != `text`) return;

    let title = message.channel.name;
    if (aliases[message.member.id]) {
        title += `-${aliases[message.member.id]}`;
    } else {
        title += `-${message.member.user.username}`;
    }
    message.channel.setName(title);
}

module.exports.closeTicketHanlder = async (reaction: MessageReaction, user: User) => {
    if (user.bot || reaction.message.author?.id != reaction.client.user?.id) return;
    if (!reaction.message.channel.name.startsWith(`ticket-`)) return;
    if (reaction.message.channel.type?.toString() != `text`) return;

    if (reaction.emoji.name != `🔒`) return;

    reaction.message.channel.send({embeds: [new MessageEmbed().setDescription(`${user} closed the Ticket.`).setColor(`#52D94F`).setTitle(`Ticket closed`]}));
    reaction.message.channel.setParent(config.ticketing.archive, {
        lockPermissions: false
    });
    reaction.message.channel.overwritePermissions([{
        id: user.id,
        deny: ['SEND_MESSAGES', `VIEW_CHANNEL`]
    }, {
        id: config.supportRole,
        allow: ['SEND_MESSAGES', `VIEW_CHANNEL`]
    }, {
        id: `707242215579189279`,
        deny: ['SEND_MESSAGES', `VIEW_CHANNEL`]
    }])
    reaction.message.reactions.removeAll();
    reaction.message.channel.setName(reaction.message.channel.name.replace(`ticket-`, `closed-`));
}