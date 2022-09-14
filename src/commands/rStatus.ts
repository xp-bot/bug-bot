import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import { CommandInterface } from '../interfaces/internalInterfaces';
const slash: SlashCommandBuilder | any = new SlashCommandBuilder()
  .setName(`status`)
  .setDescription(`Status of all XP related Services.`);
module.exports = {
  slash,
  execute
};
async function execute(interaction: CommandInteraction) {
  interaction.reply(`https://xp-bot.net/status`);
}
