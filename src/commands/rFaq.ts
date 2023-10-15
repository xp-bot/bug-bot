import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder
} from 'discord.js';
const slash: SlashCommandBuilder = new SlashCommandBuilder()
  .setName(`faq`)
  .addStringOption((o) =>
    o
      .addChoices(
        {
          name: `How do I add the level to someone's nickname?`,
          value: `autonick`
        },
        {
          name: `How do I make it so only the highest level role gets applied?`,
          value: `srr`
        },
        {
          name: `Why are XPs Slash Commands not working on my Community?`,
          value: `slashnotworking`
        },
        {
          name: `I bought Server premium. Why do i still not have the features?`,
          value: `activatepremium`
        },
        {
          name: `What is the best way to support you guys?`,
          value: `supportus`
        },
        {
          name: `My newly created roles are not showing up in the Dashboard!`,
          value: `rolecache`
        },
        { name: `other...`, value: `other` }
      )
      .setName(`question`)
      .setDescription(`Select a question!`)
      .setRequired(true)
  )
  .setDescription(`Some good to know things.`);
module.exports = {
  slash,
  execute
};

async function execute(interaction: ChatInputCommandInteraction) {
  const option = interaction.options.getString(`question`);
  if (!option) return;
  const embed = new EmbedBuilder()
    .setFooter({
      text: `Requested by ${interaction.member?.user.username}`
    })
    .setColor(`#52D94F`)
    
  switch (option) {
    case 'autonick': {
      embed
        .setTitle("How do I add the level to someone's nickname?")
        .setDescription(
          'Enable the Autonick module in the Dashboard.\n> https://xp-bot.net/me/servers'
        )
        .setImage(`https://img.namespace.media/images/msedge_T5LelagevY.png`);
      break;
    }
    case 'srr': {
      embed
        .setTitle(
          'How do I make it so only the highest level role gets applied?'
        )
        .setDescription(
          'Enable the Single Rank Role module in the Dashboard.\n> https://xp-bot.net/me/servers'
        )
        .setImage(`https://img.namespace.media/images/msedge_8Kde3e38bc.png`);
      break;
    }
    case 'slashnotworking': {
      embed
        .setTitle('Why are XPs Slash Commands not working on my Community?')
        .setDescription(
          "Since you probably invited XP prior to us introducing Slash Commands, you may not have authorized XP to register them.\nTo fix this, you can simply reinvite XP. You don't even have to kick XP first!"
        )
        .setImage(
          `https://media.discordapp.net/attachments/841338904899878912/986352612985163877/unknown.png`
        );
      break;
    }
    case 'activatepremium': {
      embed
        .setTitle(
          'I bought Server premium. Why do i still not have the features?'
        )
        .setDescription(
          `First of all. Thank you!
          Even the smallest financial support moves worlds here.
          
          You can select - and activate your premium servers in your User Settings:
          https://xp-bot.net/me/premium
          
          _Once it lights up blue, its active! No need for seperate saving._`
        )
        .setImage(`https://img.namespace.media/images/activatepremium.png`);
      break;
    }
    case 'supportus': {
      embed
        .setTitle('What is the best way to support you guys?')
        .setDescription(
          'First of all. Thank you!\nEven the smallest financial support moves worlds here.\n\nIf you want to support XP, you have to become a Premium user.\nYou can do this through Patreon and get some benefits that are exclusive to Premium users.'
        )
        .addFields(
          {
            name: `User Premium Benefits`,
            value: `**-** Premium Badge on your Ranking Card <:xppremium:851213381611946025>\n**-** You can have bigger Backgrounds and Blur them\n**-** You'll never have to vote again`,
            inline: false
          },

          {
            name: `Server Premium Benefits`,
            value: `**-** All of the above +\n**-** Autonick customization\n**-** Remove reached Levelroles\n**-** Reset left Users\n**-** Use commands in Threads\n**-** Custom Game Cooldowns\n**-** Custom max. Daily XP\n**-** Custom Leaderboard Background\n**-** Dynamic Discord Leaderboard`,
            inline: false
          },

          {
            name: `Become a Premium User`,
            value: `[Patreon](https://premium.xp-bot.net/)`,
            inline: false
          }

        )
      
        
        
        .setImage(`https://img.namespace.media/images/2021/06/16/bsp3.png`);
      break;
    }
    case 'rolecache': {
      embed
        .setTitle(
          'My newly created roles are not showing up in the Dashboard! Why?'
        )
        .setDescription(
          'XP caches every Server for about 30 minutes for performance reasons. This includes your Roles.\n\n> Wait a maximum of 30 minutes for the roles to show up. ^^'
        )
        .setImage(
          `https://media.discordapp.net/attachments/843951542020472842/1013943399734325328/unknown.png`
        );
      break;
    }
    case 'other':
      embed
        .setTitle(`Let's get you started!`)
        .setDescription(
          'We are more that happy to help!\n\n- Official Tickets: <#853977048698454027>\n- Community Support: <#1047076477671309343>'
        );
      break;
    default:
      return;
  }
  interaction.reply({ embeds: [embed] });
}
