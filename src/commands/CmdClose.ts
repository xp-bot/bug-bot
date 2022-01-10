import config from '../config.json';
import { registerReaction } from '../systems/ReactionHandler';
import { Message, PartialMessage } from 'discord.js';

export const cmdClose = async (
  message: Message | PartialMessage,
  args: any
) => {
  await message.member?.fetch();
  if (message.member?.roles.cache.has(config.supportRole)) {
    message.channel
      .send({
        content:
          args[1] || '<:xpsupport:851213499492335638> **System message**',
        embeds: [
          {
            title: 'Do you still need support?',
            description:
              'If yes, please leave detailed information about your issue below. Our team will be with you as soon as possible.\nIf not, please use 🔒 to close this ticket.',
            color: `#52D94F`
          }
        ]
      })
      .then((message) => {
        message.react('🔒').then(() => {
          registerReaction({
            messageId: message.id,
            emojiId: '🔒',
            intent: 'close_ticket'
          });
        });
      });
  }
};
