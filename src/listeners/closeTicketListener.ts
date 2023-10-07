import {
  ButtonInteraction, ChannelType, Colors, EmbedBuilder,
} from 'discord.js';

export default async function closeTicketListener(
  interaction: ButtonInteraction
) {
  if (
    interaction.channel?.type !== ChannelType.GuildText ||
    !interaction.channel?.name.startsWith(`ticket-`)
  ) {
    interaction.reply({
      ephemeral: true,
      embeds: [
        new EmbedBuilder()
          .setColor(Colors.Red)
          .setTitle(`Invalid Ticket`)
          .setDescription(`Could not resolve ticket. :/`)
      ]
    });
    return;
  }

  interaction.reply({
    embeds: [
      new EmbedBuilder()
        .setTitle(`Ticket closed`)
        .setDescription(`${interaction.user} closed the Ticket!`)
        .setColor(`#52D94F`)
    ]
  });
  if (interaction.channel?.type === ChannelType.GuildText) {
    interaction.channel.setParent(process.env.ARCHIVE_CATEGORY || '', {
      lockPermissions: false
    });
    interaction.channel.permissionOverwrites.set([
      {
        id: process.env.SUPPORT_ROLE || '',
        allow: ['SendMessages', `ViewChannel`]
      },
      {
        id: `707242215579189279`,
        deny: ['SendMessages', `ViewChannel`]
      }
    ]);
    interaction.channel.setName(
      interaction.channel.name.replace(`ticket-`, `closed-`)
    );
  }
}
