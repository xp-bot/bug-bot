import config from '../config.json';
import { Message, PartialMessage } from 'discord.js';

export const cmdHelp = async (message: Message | PartialMessage) => {
  await message.member?.fetch();
  if (message.member?.roles.cache.has(config.supportRole)) {
    message.channel.send({
      embeds: [
        {
          title: `Command Help`,
          description: `\`info\`\n> Leave a note for tickets\n
                                    \`close (@user)\`\n> Send a reminder to close the ticket\n
                                    \`delete\`\n> Delete the current ticket archive\n
                                    \`faq <topic>\`\n> Quickly send faqs`,
          footer: {
            iconURL:
              message.author?.avatarURL() || message.author?.defaultAvatarURL,
            text: `Prefix is ${config.prefix}`
          },
          color: `#52D94F`
        }
      ]
    });
  }
};
