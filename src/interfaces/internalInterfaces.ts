import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, PermissionString, Guild } from 'discord.js';
export interface CommandInterface {
  slash: SlashCommandBuilder;
  execute(interaction: CommandInteraction): Promise<void>;
}
