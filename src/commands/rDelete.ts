import {
  ChatInputCommandInteraction,
  SlashCommandBuilder
} from 'discord.js';
const slash: SlashCommandBuilder = new SlashCommandBuilder()
  .setDefaultMemberPermissions(0)
  .setName(`delete`)
  .setDescription(`Delete all closed tickets.`);
module.exports = {
  slash,
  execute
};
async function execute(interaction: ChatInputCommandInteraction) {
  interaction.guild?.channels.cache.forEach((element) => {
    if (element.name.startsWith(`closed-`)) element.delete();
  });
  interaction.reply({ ephemeral: true, content: `Deleted!` });
}
