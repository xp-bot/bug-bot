import { Message, PartialMessage } from 'discord.js';
import config from '../config.json';
import { cmdClose } from '../commands/CmdClose';
import { cmdInfo } from '../commands/CmdInfo';
import { cmdHelp } from '../commands/CmdHelp';
import { cmdDelete } from '../commands/CmdDelete';
import { cmdFaq } from '../commands/CmdFaq';

export const handleCommand = async (message: Message | PartialMessage) => {
  const cont = message.content;
  if (cont?.startsWith(config.prefix)) {
    const args = cont?.replace(config.prefix, '').split(' ');

    switch (args[0]) {
      case 'close': {
        await cmdClose(message, args);
        break;
      }
      case 'info': {
        await cmdInfo(message, cont);
        break;
      }
      case 'delete': {
        await cmdDelete(message);
        break;
      }
      case 'faq': {
        await cmdFaq(message, args);
        break;
      }
      case 'help': {
        await cmdHelp(message);
        break;
      }
    }
  }
};
