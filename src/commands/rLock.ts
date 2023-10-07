import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, MessageEmbed, PermissionString } from 'discord.js';
import { CommandInterface } from '../interfaces/internalInterfaces';
const slash: SlashCommandBuilder | any = new SlashCommandBuilder()
  .setDefaultMemberPermissions(0)
  .setName(`lock`)
  .setDescription(`Lock a support Thread.`)
  .addStringOption((o) =>
    o
      .setName(`reason`)
      .setRequired(false)
      .setDescription(`Specify a reason for the close.`)
      .addChoices(
        { name: `OP has been unresponsive.`, value: `opUnresponsive` },
        { name: `Issue was solved.`, value: `issueSolved` }
      )
  );
module.exports = {
  slash,
  execute
};
async function execute(interaction: CommandInteraction) {
  if (interaction.channel?.type === `GUILD_PUBLIC_THREAD`) {
    const embed = new MessageEmbed()
      .setColor(`#52D94F`)
      .setTitle('This Thread has been closed by a Staff member.');
    const closeReason = interaction.options.getString(`reason`);
    if (closeReason) {
      switch (closeReason) {
        case `opUnresponsive`:
          embed.setDescription('**Reason:**\n> OP has been unresponsive.');
          break;
        case `issueSolved`:
          embed.setDescription('**Reason:**\n> The original issue was solved.');
          break;
      }
    }
    interaction.reply({content:`Locked Thread!`, ephemeral:true})
    await interaction.channel.send({ embeds: [embed] });
    await interaction.channel.setLocked(
      true,
      `Locked by ${interaction.member?.user.username} because "${closeReason || `unspecified`}"`
    );
    await interaction.channel.setArchived(
      true,
      `Closed after lock by ${interaction.member?.user.username}.`
    );
  }
}
