const Discord = require(`discord.js`);
const Config = require(`../config.json`);
const djssc = require("djs-slash-commands");

const name = `close`;
const usage = ``;
const description = `Close a ticket.`;
const support = true;
const options = [{
    name: "user",
    description: "Maybe specify a specific user.",
    type: "USER",
    optional: true
}, ]

module.exports = {
    name,
    usage,
    description,
    support,
    options,
    execute,
};

/**
 * @param {djssc.BaseInteraction} interaction
 * @param {string[]} args
 * @param {Discord.GuildMember} member
 * @param {Discord.TextChannel} channel
 * @param {Discord.Guild} guild
 */
async function execute(interaction, args, member, channel, guild) {
    const messages = await channel.messages.fetch();
    let ticketUser = messages.last().mentions.users.first();
    if (args.length == 1 && args[0].type == `USER`) {
        ticketUser ??= margs[0].user;
    }
    if (!ticketUser /* || !channel.name.startsWith(`ticket-`) */ )
        return;
    interaction.reply(` `);
    interaction.deleteReply();
    await channel.send(`${ticketUser}`, new Discord.MessageEmbed().setTitle(`Hey ${ticketUser.username}`).setDescription(`**Do you still need support?**\nIf so, please explain your problem here as detailed as possible, so that our team can help you quickly and efficiently.`).setFooter(`React with 🔒 to close the ticket.`).setColor(`#52D94F`)).then(msg => msg.react(`🔒`));
    // message.channel.send(`https://img.namespace.media/images/2021/05/14/rPvMxvOEmz.gif`);

}