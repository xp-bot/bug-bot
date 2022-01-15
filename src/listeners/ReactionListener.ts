import {
  MessageReaction,
  PartialMessageReaction,
  PartialUser,
  User
} from 'discord.js';
import localSave from '../localsave.json';
import { closeTicket, openTicket } from '../systems/TicketHandler';
import {
  acceptBug,
  acceptSuggestion,
  denySubmission
} from '../systems/SubmissionHandler';

export const handleReaction = (
  reaction: MessageReaction | PartialMessageReaction,
  user: User | PartialUser
) => {
  console.log(`[Bug Bot] Found incoming Reaction Data`);

  const key = `${reaction.message.id}${reaction.emoji.id || reaction.emoji}`;

  if (localSave.reactions[key]) {
    console.log(
      `[Bug Bot] Found registered Reaction. Action: ${localSave.reactions[key].intent}`
    );

    switch (localSave.reactions[key].intent) {
      case 'open_ticket': {
        openTicket(user, reaction);
        break;
      }
      case 'close_ticket': {
        closeTicket(user, reaction);
        break;
      }
      case 'deny': {
        denySubmission(reaction).then(() => {});
        break;
      }
      case 'accept_bug': {
        acceptBug(reaction).then(() => {});
        break;
      }
      case 'accept_suggestion': {
        acceptSuggestion(reaction).then(() => {});
        break;
      }
      case 'inc_auto_score': {
        //incAutoSupportScore()
        break;
      }
      case 'dec_auto_score': {
        //decAutoSupportScore()
        //deleteSupportMessage()
        break;
      }
    }
  }
};
