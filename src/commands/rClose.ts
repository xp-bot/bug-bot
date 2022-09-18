import { SlashCommandBuilder } from '@discordjs/builders';
import {
  CommandInteraction,
  PermissionString,
  GuildMemberRoleManager,
  MessageEmbed,
  MessageActionRow,
  MessageButton,
  MessageComponentInteraction,
  Message
} from 'discord.js';
const slash: SlashCommandBuilder | any = new SlashCommandBuilder()
  .setDefaultMemberPermissions(0)
  .setName(`close`)
  .addUserOption((o) =>
    o
      .setName(`user`)
      .setDescription(`The User that created this ticket.`)
      .setRequired(true)
  )
  .setDescription(`Close a ticket.`);
module.exports = {
  slash,
  execute
};
async function execute(interaction: CommandInteraction) {
  if (interaction.channel?.type !== `GUILD_TEXT` || !interaction.channel.name.startsWith(`ticket-`)) return;
  const messages = await interaction.channel?.messages.fetch();

  let ticketUser =
    messages?.last()?.mentions.users.first() ||
    interaction.options.getUser(`user`);
    
  interaction.reply({ ephemeral: true, content: `Sent Close Prompt!` });
  const message = await interaction.channel.send({
    content: ticketUser ? `${ticketUser}` : undefined,
    embeds: [
      new MessageEmbed()
        .setTitle(`Hey ${ticketUser ? `${ticketUser.username}` : `👋`}`)
        .setDescription(
          `**Do you still need support?**\nIf so, please explain your problem here as detailed as possible, so that our team can help you quickly and efficiently.`
        )
        .setFooter({ text: `Or go ahead and 🔒 the ticket.` })
        .setColor(`#52D94F`)
    ],
    components: [
      new MessageActionRow().addComponents(
        new MessageButton()
          .setCustomId('closeTicket')
          .setLabel('Close the Ticket')
          .setStyle('SUCCESS')
          .setEmoji(`🔒`)
      )
    ]
  });

  const filter: any = (i: MessageComponentInteraction) =>
    i.customId === `closeTicket`;

  const collector = message.createMessageComponentCollector({ filter: filter, max: 1 });

  collector.on(`collect`, (i) => {
    interaction
      .editReply({
        components: []
      })
      .catch((err) => {});
  });
}
