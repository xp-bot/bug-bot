import { SlashCommandBuilder } from '@discordjs/builders';
import {
  CommandInteraction,
  PermissionString,
  GuildMemberRoleManager,
  MessageEmbed
} from 'discord.js';
const slash: SlashCommandBuilder | any = new SlashCommandBuilder()
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
          'Enable the Autonick module in the Dashboard.\> https://xp-bot.net/me/servers'
        ).setImage(`https://img.namespace.media/images/msedge_T5LelagevY.png`);
      break;
    }
    case 'srr': {
      embed
        .setTitle(
          'How do I make it so only the highest level role gets applied?'
        )
        .setDescription(
          'Enable the Single Rank Role module in the Dashboard.\> https://xp-bot.net/me/servers'
        ).setImage(`https://img.namespace.media/images/msedge_8Kde3e38bc.png`);
      break;
    }
    case 'other':
      embed
        .setTitle(`Let's get you started!`)
        .setDescription(
          'We are more that happy to help!\n\n- Official Tickets: <#853977048698454027>\n- Community Support: <#925932760936370197>'
        );
      break;
    default:
      return;
  }
  interaction.reply({ embeds: [embed] });
}
