import {
    MessageReaction,
    PartialMessageReaction,
    PartialUser,
    Permissions,
    TextChannel,
    User
} from "discord.js";
import localSave from "../localsave.json";
import config from "../config.json";
import {registerReaction} from "../utilities/ReactionHandler";
import {writeJSON} from "../utilities/IOJSON";

export const openTicket = (user: User | PartialUser, reaction: MessageReaction | PartialMessageReaction) => {
    reaction.message.guild?.channels.create(`ticket-${localSave.ticket.count + 1}`, {
        parent: config.ticket.category,
        type: "GUILD_TEXT",
        reason: 'Ticket System',
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
                    }
                    ]
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

const count = () => {
    localSave.ticket.count += 1
    writeJSON(localSave)
}