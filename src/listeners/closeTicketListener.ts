import {
  ButtonInteraction,
  MessageActionRow,
  MessageEmbed,
  Modal,
  TextInputComponent
} from 'discord.js';

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

  // const resolveComponent = new TextInputComponent()
  //   .setCustomId(`tInterviewResolve`)
  //   .setLabel(`Could we help you resolve your issue?`)
  //   .setStyle(`SHORT`);
  // const satisfiedComponent = new TextInputComponent()
  //   .setCustomId(`tInterviewSatisfied`)
  //   .setLabel(`How satisfied were you with our service?`)
  //   .setPlaceholder(`1 - 5 (1 = Terrible / 5 = Perfect)`)
  //   .setStyle(`SHORT`);

  // const improveComponent = new TextInputComponent()
  //   .setCustomId(`tInterviewImprove`)
  //   .setLabel(`Help us improve!`)
  //   .setPlaceholder(
  //     `What's on your mind? This Message can help you to improve future Support Cases.`
  //   )
  //   .setStyle(`PARAGRAPH`);
  // const modal = new Modal()
  //   .setCustomId('ticketInterviewModal')
  //   .setTitle('How did we do?')
  //   .addComponents(new MessageActionRow().addComponents(resolveComponent));
  // interaction.showModal(modal);

  // const favoriteColorInput = new TextInputComponent()
  //   .setCustomId('favoriteColorInput')
  //   // The label is the prompt the user sees for this input
  //   .setLabel("What's your favorite color?")
  //   // Short means only a single line of text
  //   .setStyle('SHORT');
  // const hobbiesInput = new TextInputComponent()
  //   .setCustomId('hobbiesInput')
  //   .setLabel("What's some of your favorite hobbies?")
  //   // Paragraph means multiple lines of text.
  //   .setStyle('PARAGRAPH');
  // // An action row only holds one text input,
  // // so you need one action row per text input.
  // const firstActionRow = new MessageActionRow().addComponents(
  //   favoriteColorInput
  // );
  // const secondActionRow = new MessageActionRow().addComponents(hobbiesInput);

  interaction.reply({
    embeds: [
      new MessageEmbed()
        .setTitle(`Ticket closed`)
        .setDescription(`${interaction.user} closed the Ticket!`)
        .setColor(`#52D94F`)
    ]
  });
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
