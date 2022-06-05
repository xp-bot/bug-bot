import { SlashCommandBuilder } from '@discordjs/builders';
import {
  CommandInteraction,
  PermissionString,
  GuildMemberRoleManager,
  MessageEmbed
} from 'discord.js';
const slash: SlashCommandBuilder | any = new SlashCommandBuilder()
  .setDefaultMemberPermissions(0)
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
        { name: `How do I access the dashboard?`, value: `dashboard` },
        { name: `other...`, value: `other` }
      )
      .setName(`question`)
      .setDescription(`Select a question!`).setRequired(true)
  )
  .setDescription(`Some good to know things.`);
module.exports = {
  slash,
  execute
};

async function execute(interaction: CommandInteraction) {
  const option = interaction.options.getString(`question`);
  if (!option) return;
  const embed = new MessageEmbed()
    .setFooter({
      text: `Requested by ${interaction.member?.user.username}`
    })
    .setColor(`#52D94F`);
  switch (option) {
    case 'autonick': {
      embed
        .setTitle("How do I add the level to someone's nickname?")
        .setDescription(
          'Enable the Autonick module.\n' + '> `.xp module switch autonick`'
        );
      break;
    }
    case 'srr': {
      embed
        .setTitle(
          'How do I make it so only the highest level role gets applied?'
        )
        .setDescription(
          'Enable the SingleRankRole module.\n' +
            '> `.xp module switch singlerankrole`'
        );
      break;
    }
    case 'dashboard': {
      embed
        .setTitle('How do I access the dashboard?')
        .setDescription(
          'Go to [xp-bot.net](https://xp-bot.net) and log in. Server Settings are currently restricted to premium subscribers due to the dashboard being in a public testing beta. If you want early access to the dashboard, [support us here](https://premium.xp-bot.net).'
        );
      break;
    }
    case 'other':
      embed
        .setTitle(`Let's get you started!`)
        .setDescription(
          'We are more that happy to help!\n\n- Official Tickts: <#853977048698454027>\n- Community Support: <#925932760936370197>'
        );
      break;
    default:
      return;
  }
  interaction.reply({ embeds: [embed] });
}
