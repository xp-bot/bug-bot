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
import { info } from 'winston';
import { sendTrackingData } from '../utilities/ilumRequests';
import { backupSetupFile } from '../utilities/uSetup';

export async function openTicketButtonListener(interaction: ButtonInteraction) {
  await sendTrackingData({ type: 'server/ticket' });

  const modal = new Modal()
    .setCustomId('openTicketModal')
    .setTitle('Tell us, whats the issue?');

  const problemOrigin = new TextInputComponent()
    .setCustomId('ticketModalProblemOrigin')
    .setLabel('What do you have problems with?')
    .setPlaceholder(`Commands / Dashboard / Setup / something else`)
    .setRequired(true)
    .setMaxLength(15)
    .setMinLength(5)
    .setStyle('SHORT');
  const probleDetails = new TextInputComponent()
    .setCustomId('ticketModalProblemDetails')
    .setLabel('Describe the problem as detailed as possible.')
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

  const firstActionRow = new MessageActionRow().addComponents(
    problemOrigin as any
  );
  const secondActionRow = new MessageActionRow().addComponents(
    probleDetails as any
  );
  const thirdActionRow = new MessageActionRow().addComponents(
    materialLinks as any
  );
  // Add inputs to the modal
  modal.addComponents(
    firstActionRow as any,
    secondActionRow as any,
    thirdActionRow as any
  );
  // Show the modal to the user
  await interaction.showModal(modal);
}

export async function openTicketModalListener(
  interaction: ModalSubmitInteraction
) {
  await sendTrackingData({ type: 'server/ticket' });
  interaction.reply({ephemeral:true, content:`Created Ticket`})

  const issueOrigin = interaction.fields.getTextInputValue(
    `ticketModalProblemOrigin`
  );
  const issueDetails = interaction.fields.getTextInputValue(
    `ticketModalProblemDetails`
  );
  const issueLinks = interaction.fields.getTextInputValue(
    `ticketModalProblemMaterial`
  );


  const infoEmbed = new MessageEmbed()
    .setTitle(`User Provided Informaton`)
    .addField(`Origin of the Issue`, `${issueOrigin || `/`}`, false)
    .addField(`Issue Details`, `\`\`\`${issueDetails || `/`}\`\`\``, false)
    .setColor(`#52D94F`);

  if (issueLinks && issueLinks.length > 0)
    infoEmbed.addField(
      `Issue Material`,
      `${issueDetails.split(` `).join(`\n`)}`,
      false
    );

  setup.ticketCount++;
  backupSetupFile();
  let num = `${setup.ticketCount}`;
  while (num.length < 4) {
    num = `0${num}`;
  }
  interaction.guild?.channels
    .create(`ticket-${num}`, {
      type: 'GUILD_TEXT',
      parent: `${config.ticketCategory}`,
      reason: `BugBot Ticket System`,
      permissionOverwrites: [
        {
          id: interaction.user.id,
          allow: ['SEND_MESSAGES', `VIEW_CHANNEL`]
        },
        {
          id: config.supportRole,
          allow: ['SEND_MESSAGES', `VIEW_CHANNEL`]
        },
        {
          id: `707242215579189279`,
          deny: ['SEND_MESSAGES', `VIEW_CHANNEL`]
        }
      ]
    })
    .then(async (channel) => {
      await channel.send({
        embeds: [
          new MessageEmbed()
            .setTitle(`Thank you for creating a Ticket`)
            .setDescription(
              `\nSupport will be with you shortly.\n\nHave a nice day! <:xpfeaturesmith:851213538440904755>`
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
        content: `Welcome  | <@&${config.supportRole}>`
      });
    });
}
