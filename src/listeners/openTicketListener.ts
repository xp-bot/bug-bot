import {
  ButtonInteraction,
  CacheType,
  CommandInteraction,
  GuildMemberRoleManager,
  Interaction,
  MessageEmbed
} from 'discord.js';

export default async function openTickerListener(
  interaction: ButtonInteraction
) {
  const count = 432 + 1;
  let num = `${count}`;
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
        content: `Welcome ${interaction.user} | <@&${config.supportRole}>`
      });
    });
}
