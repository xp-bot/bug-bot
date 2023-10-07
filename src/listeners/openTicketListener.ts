import {
  ButtonInteraction,
  EmbedBuilder,
  ModalBuilder,
  ModalSubmitInteraction,
  TextInputBuilder,
  TextInputStyle,
  ButtonBuilder,
  ActionRowBuilder,
  ChannelType,
  ButtonStyle,
  ChannelFlags,
} from 'discord.js';
import { backupSetupFile } from '../utilities/uSetup';


export async function openTicketButtonListener(interaction: ButtonInteraction) {
  interaction.channel?.type

  const modal = new ModalBuilder()
    .setCustomId('openTicketModal')
    .setTitle('Tell us, whats the issue?');

  const problemOrigin = new TextInputBuilder()
    .setCustomId('ticketModalProblemOrigin')
    .setLabel('What service do you have issues with?')
    .setPlaceholder(`Bot / Dashboard / Setup / ...`)
    .setRequired(true)
    .setMaxLength(15)
    .setMinLength(2)
    .setStyle(TextInputStyle.Short);
  const problemID = new TextInputBuilder()
    .setCustomId('ticketModalProblemID')
    .setLabel('Please provide the ID of the affected Server.')
    .setPlaceholder(`830251635490564524`)
    .setMaxLength(18)
    .setMinLength(17)
    .setRequired(false)
    .setStyle(TextInputStyle.Short);
  const problemDetails = new TextInputBuilder()
    .setCustomId('ticketModalProblemDetails')
    .setLabel('Describe your issue as detailed as possible.')
    .setPlaceholder(`My problem is...`)
    .setRequired(true)
    .setMaxLength(1000)
    .setMinLength(25)
    .setStyle(TextInputStyle.Paragraph);
  const materialLinks = new TextInputBuilder()
    .setCustomId('ticketModalProblemMaterial')
    .setLabel('Attach material in the form of screenshots.')
    .setPlaceholder(
      `https://imgur.com/EZUt6sz\nhttps://imgur.com/gallery/UmaLaZS`
    )
    .setMaxLength(1000)
    .setRequired(false)
    .setStyle(TextInputStyle.Paragraph);

  const firstActionRow =
    new ActionRowBuilder<TextInputBuilder>().addComponents(problemOrigin);
  const idActionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(
    problemID
  );
  const secondActionRow =
    new ActionRowBuilder<TextInputBuilder>().addComponents(problemDetails);
  const thirdActionRow =
    new ActionRowBuilder<TextInputBuilder>().addComponents(materialLinks);
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

  const infoEmbed = new EmbedBuilder()
    .setTitle(`Details of Ticket ${num}`)
    .setDescription(`> ${issueDetails.replace(/\n/gm, `\n> `)}`)
    .setFooter({
      text: `Origin of the Issue: ${issueOrigin || `/`} | ServerID: ${issueServerID || `/`
        }`
    })
    .setColor(`#52D94F`);
  if (issueLinks && issueLinks.length > 0)
    infoEmbed.addFields(
      {
        name: `Issue Material`,
        value: `${issueLinks.split(` `).join(`\n`)}`,
        inline: false
      }
    );

  interaction.guild?.channels
    .create({ 
      name: `ticket-${num}`, 
      type: ChannelType.GuildText,
      parent: `${process.env.TICKET_CATEGORY}`,
      reason: `BugBot Ticket System`,
      permissionOverwrites: [
        {
          id: interaction.user.id,
          allow: ["SendMessages", `ViewChannel`]
        },
        {
          id: process.env.SUPPORT_ROLE || '',
          allow: ['SendMessages', `ViewChannel`]
        },
        {
          id: interaction.guild.roles.everyone.id,
          deny: ['SendMessages', `ViewChannel`]
        }
      ]
    })
    .then(async (channel) => {
      if (channel.type !== ChannelType.GuildText) return;

      await channel.send({
        embeds: [
          new EmbedBuilder()
            .setTitle(`Thank you for creating a Ticket!`)
            .setDescription(
              `We are reviewing your information...\n**The Support Team will be with you shortly.**\n\nHave a nice day! <:xpfeaturesmith:851213538440904755>`
            )
            .setColor(`#52D94F`),
          infoEmbed
        ],
        components: [
          new ActionRowBuilder<ButtonBuilder>().addComponents(
            new ButtonBuilder()
              .setCustomId('closeTicket')
              .setLabel('Close the Ticket')
              .setStyle(ButtonStyle.Success)
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
