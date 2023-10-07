import { CommandInteraction, SlashCommandBuilder } from 'discord.js';
export interface CommandInterface {
  slash: SlashCommandBuilder;
  execute(interaction: CommandInteraction): Promise<void>;
}
