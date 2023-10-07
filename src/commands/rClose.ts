import {
  EmbedBuilder,
  ActionRowBuilder,
  MessageComponentInteraction,
  ChannelType,
  ButtonBuilder,
  ButtonStyle,
  ChatInputCommandInteraction,
  SlashCommandBuilder
} from 'discord.js';
const slash: SlashCommandBuilder = new SlashCommandBuilder()
  .setDefaultMemberPermissions(0)
  .setName(`close`)
  .addUserOption((o) =>
    o
      .setName(`user`)
      .setDescription(`The User that created this ticket.`)
      .setRequired(true)
  )
  .setDescription(`Close a ticket.`);
module.exports = {
  slash,
  execute
};
async function execute(interaction: ChatInputCommandInteraction) {
  if ((interaction.channel?.type !== ChannelType.GuildText) || (!interaction.channel.name.startsWith(`ticket-`))) return;
  const messages = await interaction.channel?.messages.fetch();

  let ticketUser =
    messages?.last()?.mentions.users.first() ||
    interaction.options.getUser(`user`);
    
  interaction.reply({ ephemeral: true, content: `Sent Close Prompt!` });
  const message = await interaction.channel.send({
    content: ticketUser ? `${ticketUser}` : undefined,
    embeds: [
      new EmbedBuilder()
        .setTitle(`Hey ${ticketUser ? `${ticketUser.username}` : `👋`}`)
        .setDescription(
          `**Do you still need support?**\nIf so, please explain your problem here as detailed as possible, so that our team can help you quickly and efficiently.`
        )
        .setFooter({ text: `Or go ahead and 🔒 the ticket.` })
        .setColor(`#52D94F`)
    ],
    components: [
      new ActionRowBuilder<ButtonBuilder>().addComponents(
        new ButtonBuilder()
          .setCustomId('closeTicket')
          .setLabel('Close the Ticket')
          .setStyle(ButtonStyle.Success)
          .setEmoji(`🔒`)
      )
    ]
  });

  const filter: any = (i: MessageComponentInteraction) =>
    i.customId === `closeTicket`;

  const collector = message.createMessageComponentCollector({ filter: filter, max: 1 });

  collector.on(`collect`, (i) => {
    interaction
      .editReply({
        components: []
      })
      .catch((err) => {});
  });
}
