import {
  Message,
  MessageReaction,
  PartialMessage,
  PartialMessageReaction
} from 'discord.js';
import config from '../config.json';
import { registerReaction, removeReaction } from './ReactionHandler';
import { Octokit } from '@octokit/rest';
import { randomIntFromInterval } from '../utilities/Misc';

const octoClient = new Octokit({ auth: config.githubAuth });

export const initSubmission = async (message: Message | PartialMessage) => {
  let type = 'none';
  if (
    message.channel.id === config.channels.suggestions.channel ||
    message.channel.id === config.channels.bugreports.channel
  ) {
    if (message.content?.startsWith('# ')) return;
    switch (message.channel.id) {
      case config.channels.suggestions.channel: {
        type = 'suggestion';
        break;
      }
      case config.channels.bugreports.channel: {
        type = 'bug';
        break;
      }
    }

    message.react('<:g_up:818532849560846379>').then((msg) => {
      registerReaction({
        messageId: message.id,
        emojiId: msg.emoji.id || msg.emoji,
        intent: `accept_${type}`
      });
    });
    message.react('🔻').then((msg) => {
      registerReaction({
        messageId: message.id,
        emojiId: msg.emoji.id || msg.emoji,
        intent: 'deny'
      });
    });
  }
};

export const acceptBug = async (
  reaction: MessageReaction | PartialMessageReaction
) => {
  await reaction.message.fetch();
  
  if (reaction.message.member?.roles.cache.has(config.devRole)) {

    removeReaction({
      messageId: reaction.message.id,
      emojiId: '🔻'
    });

    removeReaction({
      messageId: reaction.message.id,
      emojiId: reaction.emoji.id || reaction.emoji
    });

    reaction.message.reactions.removeAll().then(() => {
      const id = `BugID: \`ba-${randomIntFromInterval(10000, 99999)}\``;
      const column = config.channels.bugreports.column;

      const message = `*Creator: ${reaction.message.author?.tag}\n${id}*\n\n${reaction.message.content}`;
      octoClient.rest.projects.createCard({ note: message, column_id: column });

      reaction.message.react('<:xp_check:818532849564909658>');
    });
  }
};

export const acceptSuggestion = async (
  reaction: MessageReaction | PartialMessageReaction
) => {
  await reaction.message.fetch();

  if (reaction.message.member?.roles.cache.has(config.devRole)) {

    removeReaction({
      messageId: reaction.message.id,
      emojiId: '🔻'
    });

    removeReaction({
      messageId: reaction.message.id,
      emojiId: reaction.emoji.id || reaction.emoji
    });

    reaction.message.reactions.removeAll().then(() => {
      const id = `SuggestionID: \`sa-${randomIntFromInterval(10000, 99999)}\``;
      const column = config.channels.suggestions.column;

      const message = `*Creator: ${reaction.message.author?.tag}\n${id}*\n\n${reaction.message.content}`;
      octoClient.rest.projects.createCard({ note: message, column_id: column });

      reaction.message.react('<:xp_check:818532849564909658>');
    });
  }
};

export const denySubmission = async (
  reaction: MessageReaction | PartialMessageReaction
) => {

  await reaction.message.fetch();

  if (reaction.message.member?.roles.cache.has(config.devRole)) {

    removeReaction({
      messageId: reaction.message.id,
      emojiId: '818532849560846379'
    });

    removeReaction({
      messageId: reaction.message.id,
      emojiId: reaction.emoji.id || reaction.emoji
    });

    reaction.message.reactions.removeAll().then(() => {
      reaction.message.react('<:xp_cross:818532849690083339>');
    });
  }

};
