import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} from 'discord.js';
const slash: SlashCommandBuilder = new SlashCommandBuilder()
  .setDefaultMemberPermissions(0)
  .setName(`message`)
  .setDescription(`Create the "Open Ticket" message.`);
module.exports = {
  slash,
  execute
};
async function execute(interaction: ChatInputCommandInteraction) {
  interaction.reply({ ephemeral: true, content: `Created Message!` });
  interaction.channel?.send({
    embeds: [
      new EmbedBuilder()
        .setTitle(`Official XP Support`)
        .setDescription(`We are here to help!`)
        .setColor(`#52D94F`)
    ],
    components: [
      new ActionRowBuilder<ButtonBuilder>().addComponents(
        new ButtonBuilder()
          .setCustomId('openTicket')
          .setLabel('Open a Ticket')
          .setStyle(ButtonStyle.Success)
          .setEmoji(`<:xp_check:818532849564909658>`)
      )
    ]
  });
}
