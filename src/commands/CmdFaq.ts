import { Message, PartialMessage } from 'discord.js';

export const cmdFaq = async (message: Message | PartialMessage, args: any) => {
  let embed = {};
  switch (args[1]) {
    case 'autonick': {
      embed = {
        title: "How do I add the level to someone's nickname?",
        description:
          'Enable the Autonick module.\n' + '> `.xp module switch autonick`',
        footer: { text: `Requested by ${message.author?.tag}` }
      };
      break;
    }
    case 'srr': {
      embed = {
        title: 'How do I make it so only the highest levelrole gets applied?',
        description:
          'Enable the SingleRankRole module.\n' +
          '> `.xp module switch singlerankrole`',
        footer: { text: `Requested by ${message.author?.tag}` }
      };
      break;
    }
    case 'dashboard': {
      embed = {
        title: 'How do I access the dashboard?',
        description:
          'Go to [xp-bot.net](https://xp-bot.net) and log in. Server Settings are currently restricted to premium subscribers due to the dashboard being in a public testing beta. If you want early access to the dashboard, [support us here](https://premium.xp-bot.net).',
        footer: { text: `Requested by ${message.author?.tag}` }
      };
      break;
    }
    default: {
      embed = {
        title: 'Available FAQs',
        description: '`autonick`, `srr`, `dashboard`',
        footer: { text: `Requested by ${message.author?.tag}` }
      };
    }
  }
  message.channel.send({ embeds: [embed] });
  await message.delete();
};
