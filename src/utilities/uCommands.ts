import { REST } from "discord.js";
import fs from "fs";
import path from "path";
import { CommandInterface } from '../interfaces/internalInterfaces';

export async function registerGuildCommands() {
  const commands = [];
  const botCommands: CommandInterface[] = [];
  const commandFiles = await fetchFiles(`./build/commands`);

  if (!botClient.user) {
    logger.error(`Bot User is null??`)
    return;
  }

  // Place your client and guild ids here

  for (const file of commandFiles) {
    const command = require(`../${file.filepath.replace(`build`, ``)}`);
    const discordCommand = command.slash.toJSON();
    if (!command.developerOnly) {
      commands.push(discordCommand);
      botCommands.push(command);
    }
  }

  global.botCommands = botCommands;

  if (!process.env.TOKEN) process.exit(1);

  const rest = new REST({ version: "9" }).setToken(process.env.TOKEN);

  (async () => {
    try {
      logger.info(`Started refreshing application (/) commands.`)

      logger.info(`Successfully reloaded application (/) commands.`)
    } catch (error) {
      logger.error(`Could not register commands:`, error)
    }
  })();
}

const fetchFiles = async (targetPath: string) => {
  const files = await fs.promises.readdir(targetPath);
  const fetchedFiles = [];

  for (const file of files) {
    try {
      const filepath = path.join(targetPath, file);
      const stats = await fs.promises.lstat(filepath);

      if (stats.isFile()) {
        fetchedFiles.push({
          filepath,
        });
      }

      if (stats.isDirectory()) {
        const childFiles = await fs.promises.readdir(filepath);
        files.push(...childFiles.map((f) => path.join(file, f)));
      }
    } catch (err) {
      logger.error(err);
    }
  }

  return fetchedFiles;
};