import { SlashCommandBuilder } from '@discordjs/builders';
import {
  CommandInteraction,
  PermissionString,
  GuildMemberRoleManager,
  MessageEmbed,
  MessageActionRow,
  MessageButton
} from 'discord.js';
const slash: SlashCommandBuilder | any = new SlashCommandBuilder()
  .setDefaultMemberPermissions(0)
  .setName(`message`)
  .setDescription(`Create the "Open Ticket" message.`);
module.exports = {
  slash,
  execute
};
async function execute(interaction: CommandInteraction) {
  
  interaction.reply({
    embeds: [
      new MessageEmbed()
        .setTitle(`Official XP Support`)
        .setDescription(
          `We are here to help!`
        )
        .setColor(`#52D94F`)
    ],
    components: [
      new MessageActionRow().addComponents(
        new MessageButton()
          .setCustomId('openTicket')
          .setLabel('Open a Ticket')
          .setStyle('SUCCESS')
          .setEmoji(`<:xp_check:818532849564909658>`)
      )
    ],
    fetchReply: true
  });
}
