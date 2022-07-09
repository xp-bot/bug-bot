import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, PermissionString } from 'discord.js';
import { CommandInterface } from '../interfaces/internalInterfaces';
const slash: SlashCommandBuilder | any = new SlashCommandBuilder()
  .setDefaultMemberPermissions(0)
  .setName(`gethelp`)
  .setDescription(`Check out #get-help to get Support!`);
module.exports = {
  slash,
  execute
};
async function execute(interaction: CommandInteraction) {}
