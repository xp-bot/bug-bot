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
  const message = await interaction.reply({
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
          .setCustomId('close')
          .setLabel('Close the Ticket')
          .setStyle('SUCCESS')
          .setEmoji(`🔒`)
      )
    ],
    fetchReply: true
  });

  const filter: any = (i: MessageComponentInteraction) =>
    i.customId === `close`;

  const collector = (
    message as Message<boolean>
  ).createMessageComponentCollector({ filter: filter, max: 1 });

  collector.on(`collect`, (i) => {
    interaction
      .editReply({
        components: []
      })
      .catch((err) => {});

    i.reply({
      embeds: [
        new MessageEmbed()
          .setTitle(`Ticket closed`)
          .setDescription(`${i.user} closed the Ticket!`)
          .setColor(`#52D94F`)
      ]
    }).catch((err) => {});
    if (interaction.channel?.type === `GUILD_TEXT`) {
      interaction.channel.setParent(config.archiveCategory, {
        lockPermissions: false
      });
      interaction.channel.permissionOverwrites.set([
        {
          id: ticketUser?.id || ``,
          deny: ['SEND_MESSAGES', `VIEW_CHANNEL`]
        },
        {
          id: config.supportRole,
          allow: ['SEND_MESSAGES', `VIEW_CHANNEL`]
        }
      ]);
      interaction.channel.setName(
        interaction.channel.name.replace(`ticket-`, `closed-`)
      );
    }
  });
}
