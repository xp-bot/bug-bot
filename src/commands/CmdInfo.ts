import config from '../config.json';
import { Message, PartialMessage } from 'discord.js';

export const cmdInfo = async (
  message: Message | PartialMessage,
  cont: String
) => {
  await message.member?.fetch();
  if (message.member?.roles.cache.has(config.supportRole)) {
    message.channel.send({
      embeds: [
        {
          title: `Support Note`,
          description: cont?.replace(config.prefix + 'info ', ''),
          footer: {
            iconURL:
              message.author?.avatarURL() || message.author?.defaultAvatarURL,
            text: message.author?.tag
          },
          color: `#52D94F`
        }
      ]
    });
  }
};
