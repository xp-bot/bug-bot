const Discord = require(`discord.js`);
const Config = require(`../config.json`);

const name = `deb`;
const usage = ``;
const description = `deb`;
const support = false;
const hideHelp = false;

module.exports = {
    name,
    usage,
    description,
    support,
    hideHelp,
    execute,
};

/**
 * @param {Discord.Message} message
 * @param {string[]} args
 * @param {Discord.GuildMember} member
 * @param {Discord.TextChannel} channel
 * @param {Discord.Guild} guild
 */
async function execute(message, args, member, channel, guild) {
    // console.log(`hi`);
    // channel.send(`Welcome <@414755070161453076> | <@&875393646147534909>`, new Discord.MessageEmbed().setTitle(`Thank you for creating a Ticket`).setDescription(`\nSupport will be with you shortly.\n**Please use this time to describe your issue as detailed as possible.**\n\nHave a nice day! <:xpfeaturesmith:851213538440904755>`).setColor(`#52D94F`));
    // channel.send(emb)


    // await channel.send(`<@289077956976967680>`, new Discord.MessageEmbed().setTitle(`Hey CodeNeo`).setDescription(`**Do you still need support?**\nIf so, please explain your problem here as detailed as possible, so that our team can help you quickly and efficiently.`).setFooter(`React with 🔒 to close the ticket.`).setColor(`#52D94F`)).then(msg => msg.react(`🔒`));


    // channel.send(new Discord.MessageEmbed().setDescription(`<@289077956976967680> closed the Ticket.`).setColor(`#52D94F`).setTitle(`Ticket closed`));

}