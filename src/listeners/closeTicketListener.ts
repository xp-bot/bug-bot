import { ButtonInteraction, MessageEmbed } from 'discord.js';

export default async function closeTicketListener(
  interaction: ButtonInteraction
) {
  if (
    interaction.channel?.type !== `GUILD_TEXT` ||
    !interaction.channel?.name.startsWith(`ticket-`)
  ) {
    interaction.reply({
      ephemeral: true,
      embeds: [
        new MessageEmbed()
          .setColor('RED')
          .setTitle(`Invalid Ticket`)
          .setDescription(`Could not resolve ticket. :/`)
      ]
    });
    return;
  }

  interaction
    .reply({
      embeds: [
        new MessageEmbed()
          .setTitle(`Ticket closed`)
          .setDescription(`${interaction.user} closed the Ticket!`)
          .setColor(`#52D94F`)
      ]
    })
    .catch((err) => {});
  if (interaction.channel?.type === `GUILD_TEXT`) {
    interaction.channel.setParent(config.archiveCategory, {
      lockPermissions: false
    });
    interaction.channel.permissionOverwrites.set([
      {
        id: config.supportRole,
        allow: ['SEND_MESSAGES', `VIEW_CHANNEL`]
      },
      {
        id: `707242215579189279`,
        deny: ['SEND_MESSAGES', `VIEW_CHANNEL`]
      }
    ]);
    interaction.channel.setName(
      interaction.channel.name.replace(`ticket-`, `closed-`)
    );
  }
}
