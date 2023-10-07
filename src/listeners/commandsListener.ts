import {
  CommandInteraction,
} from 'discord.js';

export default async function commandsListener(
  interaction: CommandInteraction
) {
  if (!interaction.guildId) return;

  const { commandName } = interaction;

  const found = botCommands.find((cmd) => cmd.slash.name === commandName);

  if (!found) return;

  try {
    await found.execute(interaction);
  } catch (error) {
    logger.error(`Error when running Command ${commandName}`, error);
  }
}
