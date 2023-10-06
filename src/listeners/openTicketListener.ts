import {
  ButtonInteraction,
  CacheType,
  CommandInteraction,
  GuildMemberRoleManager,
  Interaction,
  MessageActionRow,
  MessageButton,
  MessageEmbed,
  Modal,
  ModalSubmitInteraction,
  TextInputComponent
} from 'discord.js';
import { backupSetupFile } from '../utilities/uSetup';

export async function openTicketButtonListener(interaction: ButtonInteraction) {
  interaction.channel?.type

  const modal = new Modal()
    .setCustomId('openTicketModal')
    .setTitle('Tell us, whats the issue?');

  const problemOrigin = new TextInputComponent()
    .setCustomId('ticketModalProblemOrigin')
    .setLabel('What service do you have issues with?')
    .setPlaceholder(`Bot / Dashboard / Setup / ...`)
    .setRequired(true)
    .setMaxLength(15)
    .setMinLength(2)
    .setStyle('SHORT');
  const problemID = new TextInputComponent()
    .setCustomId('ticketModalProblemID')
    .setLabel('Please provide the ID of the affected Server.')
    .setPlaceholder(`830251635490564524`)
    .setMaxLength(18)
    .setMinLength(17)
    .setRequired(false)
    .setStyle('SHORT');
  const problemDetails = new TextInputComponent()
    .setCustomId('ticketModalProblemDetails')
    .setLabel('Describe your issue as detailed as possible.')
    .setPlaceholder(`My problem is...`)
    .setRequired(true)
    .setMaxLength(1000)
    .setMinLength(25)
    .setStyle('PARAGRAPH');
  const materialLinks = new TextInputComponent()
    .setCustomId('ticketModalProblemMaterial')
    .setLabel('Attach material in the form of screenshots.')
    .setPlaceholder(
      `https://imgur.com/EZUt6sz\nhttps://imgur.com/gallery/UmaLaZS`
    )
    .setMaxLength(1000)
    .setRequired(false)
    .setStyle('PARAGRAPH');

  const firstActionRow =
    new MessageActionRow<TextInputComponent>().addComponents(problemOrigin);
  const idActionRow = new MessageActionRow<TextInputComponent>().addComponents(
    problemID
  );
  const secondActionRow =
    new MessageActionRow<TextInputComponent>().addComponents(problemDetails);
  const thirdActionRow =
    new MessageActionRow<TextInputComponent>().addComponents(materialLinks);
  // Add inputs to the modal
  modal.addComponents(
    firstActionRow,
    idActionRow,
    secondActionRow,
    thirdActionRow
  );
  // Show the modal to the user
  await interaction.showModal(modal);
}

export async function openTicketModalListener(
  interaction: ModalSubmitInteraction
) {

  const issueOrigin = interaction.fields.getTextInputValue(
    `ticketModalProblemOrigin`
  );
  const issueServerID =
    interaction.fields.getTextInputValue(`ticketModalProblemID`);
  const issueDetails = interaction.fields.getTextInputValue(
    `ticketModalProblemDetails`
  );
  const issueLinks = interaction.fields.getTextInputValue(
    `ticketModalProblemMaterial`
  );

  setup.ticketCount++;
  backupSetupFile();
  let num = `${setup.ticketCount}`;
  while (num.length < 4) {
    num = `0${num}`;
  }

  const infoEmbed = new MessageEmbed()
    .setTitle(`Details of Ticket ${num}`)
    .setDescription(`> ${issueDetails.replace(/\n/gm, `\n> `)}`)
    .setFooter({
      text: `Origin of the Issue: ${issueOrigin || `/`} | ServerID: ${issueServerID || `/`
        }`
    })
    .setColor(`#52D94F`);
  if (issueLinks && issueLinks.length > 0)
    infoEmbed.addField(
      `Issue Material`,
      `${issueLinks.split(` `).join(`\n`)}`,
      false
    );

  interaction.guild?.channels
    .create(`ticket-${num}`, {
      type: 'GUILD_TEXT',
      parent: `${process.env.TICKET_CATEGORY}`,
      reason: `BugBot Ticket System`,
      permissionOverwrites: [
        {
          id: interaction.user.id,
          allow: ['SEND_MESSAGES', `VIEW_CHANNEL`]
        },
        {
          id: process.env.SUPPORT_ROLE || '',
          allow: ['SEND_MESSAGES', `VIEW_CHANNEL`]
        },
        {
          id: interaction.guild.roles.everyone.id,
          deny: ['SEND_MESSAGES', `VIEW_CHANNEL`]
        }
      ]
    })
    .then(async (channel) => {
      await channel.send({
        embeds: [
          new MessageEmbed()
            .setTitle(`Thank you for creating a Ticket!`)
            .setDescription(
              `We are reviewing your information...\n**The Support Team will be with you shortly.**\n\nHave a nice day! <:xpfeaturesmith:851213538440904755>`
            )
            .setColor(`#52D94F`),
          infoEmbed
        ],
        components: [
          new MessageActionRow().addComponents(
            new MessageButton()
              .setCustomId('closeTicket')
              .setLabel('Close the Ticket')
              .setStyle('SUCCESS')
              .setEmoji(`🔒`)
          )
        ],
        content: `**Welcome <@${interaction.user.id}>** | <@&${process.env.SUPPORT_ROLE}>`
      });
    });

  interaction.reply({
    ephemeral: true,
    content: `Created Ticket \`ticket-${num}\`!`
  });
}
