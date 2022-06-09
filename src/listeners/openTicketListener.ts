import {
  ButtonInteraction,
  CacheType,
  CommandInteraction,
  GuildMemberRoleManager,
  Interaction,
  MessageActionRow,
  MessageButton,
  MessageEmbed
} from 'discord.js';
import { sendTrackingData } from '../utilities/ilumRequests';
import { backupSetupFile } from '../utilities/uSetup';

export default async function openTicketListener(
  interaction: ButtonInteraction
) {
  await sendTrackingData({})

  setup.ticketCount++;
  backupSetupFile();
  let num = `${setup.ticketCount}`;
  while (num.length < 4) {
    num = `0${num}`;
  }
  interaction.guild?.channels
    .create(`ticket-${num}`, {
      type: 'GUILD_TEXT',
      parent: `${config.ticketCategory}`,
      reason: `BugBot Ticket System`,
      permissionOverwrites: [
        {
          id: interaction.user.id,
          allow: ['SEND_MESSAGES', `VIEW_CHANNEL`]
        },
        {
          id: config.supportRole,
          allow: ['SEND_MESSAGES', `VIEW_CHANNEL`]
        },
        {
          id: `707242215579189279`,
          deny: ['SEND_MESSAGES', `VIEW_CHANNEL`]
        }
      ]
    })
    .then(async (channel) => {
      await channel.send({
        embeds: [
          new MessageEmbed()
            .setTitle(`Thank you for creating a Ticket`)
            .setDescription(
              `\nSupport will be with you shortly.\n**Please use this time to describe your issue as detailed as possible.**\n\nHave a nice day! <:xpfeaturesmith:851213538440904755>`
            )
            .setColor(`#52D94F`)
        ],
        components: [
          new MessageActionRow().addComponents(
            new MessageButton()
              .setCustomId('closeTicket')
              .setLabel('Close the Ticket')
              .setStyle('SUCCESS')
              .setEmoji(`🔒`)
          )
        ],
        content: `Welcome ${interaction.user} | <@&${config.supportRole}>`
      });
    });
}
