import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, Guild } from 'discord.js';
export interface CommandInterface {
  slash: SlashCommandBuilder;
  execute(interaction: CommandInteraction): Promise<void>;
}
