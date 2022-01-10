import {
    Message,
    MessageReaction,
    PartialMessageReaction,
    PartialUser,
    Permissions,
    TextChannel,
    User
} from "discord.js";
import localSave from "../localsave.json";
import config from "../config.json";
import {registerReaction, removeReaction} from "../utilities/ReactionHandler";
import {writeJSON} from "../utilities/IOJSON";

export const openTicket = (user: User | PartialUser, reaction: MessageReaction | PartialMessageReaction) => {
    reaction.message.guild?.channels.create(`ticket-${localSave.ticket.count + 1}`, {
        parent: config.ticket.category,
        type: "GUILD_TEXT",
        reason: 'Ticket System: Opened Case',
        permissionOverwrites: [{
            id: user.id,
            allow: [Permissions.FLAGS.SEND_MESSAGES, Permissions.FLAGS.VIEW_CHANNEL]
        }, {
            id: config.supportRole,
            allow: [Permissions.FLAGS.SEND_MESSAGES, Permissions.FLAGS.VIEW_CHANNEL]
        }, {
            id: reaction.message.guild?.roles.everyone,
            deny: [Permissions.FLAGS.SEND_MESSAGES, Permissions.FLAGS.VIEW_CHANNEL]
        }]
    }).then(async (channel: TextChannel) => {
        count()
        const msg = await channel.send(
            {
                content: `Welcome ${user} | <@&${config.supportRole}>`,
                embeds: [{
                    title: "Thank you for creating a Ticket",
                    description: "Support will be with you shortly.\nPlease take your time to describe your issue as detailed as possible.\n\nHave a nice day!",
                    footer: {text: "Use 🔒 to close this ticket."},
                    color: `#52D94F`,
                }]
            }
        )
        msg.react('🔒').then(r => {
            registerReaction({
                messageId: msg.id,
                emojiId: "🔒",
                intent: "close_ticket"
            })
        })
    })
}

export const closeTicket = (user: User | PartialUser, reaction: MessageReaction | PartialMessageReaction) => {
    reaction.message.reactions.removeAll().then(r => {
        removeReaction({
            messageId: reaction.message.id,
            emojiId: reaction.emoji
        })

        const channel: TextChannel = <TextChannel>reaction.message.channel;
        channel.edit({
            name: channel.name.replace(`ticket-`, `closed-`),
            parent: config.ticket.archive,
            permissionOverwrites: [{
                id: config.supportRole,
                allow: [Permissions.FLAGS.SEND_MESSAGES, Permissions.FLAGS.VIEW_CHANNEL]
            }, {
                id: channel.guild.roles.everyone,
                deny: [Permissions.FLAGS.SEND_MESSAGES, Permissions.FLAGS.VIEW_CHANNEL]
            }]
        })

        reaction.message.channel.send({
            embeds: [{
                title: "Ticket closed.",
                description: `Ticket has been closed by ${user}`,
                color: `#52D94F`,
            }]
        })
    })
}

export const assignTicket = async (message: Message) => {
    const channel: TextChannel = <TextChannel> message.channel;
    if (!(channel.name.startsWith(`ticket-`) && !isNaN(Number(channel.name.slice(7).trim())))) return;
    await message.member?.fetch()
    if (message.member?.roles.cache.has(config.supportRole)) {
        await channel.edit({name: `${channel.name}-${config.aliases[message.author.id] || message.member.user.username}`})
    }
}

const count = () => {
    localSave.ticket.count += 1
    writeJSON(localSave)
}