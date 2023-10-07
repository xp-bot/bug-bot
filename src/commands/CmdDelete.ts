import config from '../config.json';
import { Message, PartialMessage } from 'discord.js';

export const cmdDelete = async (message: Message | PartialMessage) => {
  await message.member?.fetch();
  if (message.member?.roles.cache.has(config.devRole)) {
    message.guild?.channels.cache.forEach((element) => {
      if (element.name.startsWith(`closed-`)) element.delete();
    });
    message.channel.send(`Deleted!`);
  }
};
