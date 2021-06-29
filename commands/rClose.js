const Discord = require(`discord.js`);
const Config = require(`../config.json`);

const name = `close`;
const usage = ``;
const description = `Close a ticket.`;
const support = true;

module.exports = {
    name,
    usage,
    description,
    support,
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
    const messages = await channel.messages.fetch();
    let ticketUser = messages.last().mentions.users.first();
    // for (let i = messages.array().length - 1; i > messages.array().length - 3; i--) {
    //     const element = messages.array()[i];
    //     if (element.author.id == `793647934084087808`) {
    //         ticketUser = element.mentions.users.first();
    //         break;
    //     }
    // }
    if (message.mentions.users.size == 1 || message.mentions.members.size == 1){
        ticketUser ??= message.mentions.users.first();
        ticketUser ??= message.mentions.members.first();
    }
    if (!ticketUser /* || !channel.name.startsWith(`ticket-`) */ )
        return;
    await message.channel.send(`${ticketUser}`, new Discord.MessageEmbed().setTitle(`Hey ${ticketUser.username}`).setDescription(`**Do you still need support?**\nIf so, please explain your problem here as detailed as possible, so that our team can help you quickly and efficiently.`).setFooter(`React with 🔒 to close the ticket.`).setColor(`#52D94F`)).then(msg => msg.react(`🔒`));
    // message.channel.send(`https://img.namespace.media/images/2021/05/14/rPvMxvOEmz.gif`);

}