import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { CommandInterface } from '../interfaces/internalInterfaces';
const slash: SlashCommandBuilder = new SlashCommandBuilder()
  .setName(`status`)
  .setDescription(`Status of all XP related Services.`);
module.exports = {
  slash,
  execute
};
async function execute(interaction: ChatInputCommandInteraction) {
  interaction.reply(`https://xp-bot.net/status`);
}
