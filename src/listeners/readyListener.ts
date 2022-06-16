import { CommandInterface } from "../interfaces/internalInterfaces";
import fs from "fs";
import { REST } from "@discordjs/rest";
import path from "path";
import { Routes } from 'discord-api-types/v10';

export async function readyListener() {
  logger.info(`Booted!`);

  await registerGuildCommands();
}


export async function registerGuildCommands() {
  const commands = [];
  const botCommands: CommandInterface[] = [];
  const commandFiles = await fetchFiles(`./build/commands`);

  if(!botClient.user) {
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

  const rest = new REST({ version: "9" }).setToken(config.token);

  (async () => {
    try {
      logger.info(`Started refreshing application (/) commands.`)

      await rest.put(Routes.applicationGuildCommands(botClient.user?.id || ``, config.guild), {
        // await rest.put(Routes.applicationCommands(clientId), {
        body: commands,
      });

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