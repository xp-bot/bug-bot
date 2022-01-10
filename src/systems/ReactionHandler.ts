import localSave from '../localsave.json';
import { writeJSON } from '../utilities/IOJSON';

export const registerReaction = (data: any, options?: Object) => {
  localSave.reactions[`${data.messageId}${data.emojiId}`] = {
    intent: data.intent,
    options: options
  };
  writeJSON(localSave);
};

export const removeReaction = (data: any) => {
  delete localSave.reactions[`${data.messageId}${data.emojiId}`];
  writeJSON(localSave);
};
