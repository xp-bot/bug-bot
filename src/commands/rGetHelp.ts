import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, MessageEmbed, PermissionString } from 'discord.js';
import { CommandInterface } from '../interfaces/internalInterfaces';
const slash: SlashCommandBuilder | any = new SlashCommandBuilder()
  .setDefaultMemberPermissions(0)
  .setName(`gethelp`)
  .setDescription(`Check out #get-help to get Support!`);
module.exports = {
  slash,
  execute
};
async function execute(interaction: CommandInteraction) {
  const embed = new MessageEmbed()
    .setColor(`#52D94F`)
    .setTitle('This channel is not for Support!')
    .setDescription('**These are your options:**')
    .addFields([
      {
        name: `Community`,
        value: `Head over to <#925932760936370197> and create a Thread.`,
        inline: true
      },
      {
        name: `Official Support`,
        value: `Create a Ticket in <#853977048698454027>.`,
        inline: true
      }
    ])
    .setImage(`https://cdn.namespace.media/s/Zw4LoTR4KQzz4re/preview`);
  interaction.reply({ embeds: [embed] });
}
