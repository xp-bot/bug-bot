const Discord = require(`discord.js`);
const Config = require(`../config.json`);

const name = `takeover`;
const usage = ``;
const description = `Takeover a ticket.`;
const support = false;

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
    if (!message.channel.name.startsWith(`ticket-`)) {
        return;
    }
    if (message.channel.type != `text`) {
        return;
    }
    const e = new Discord.MessageEmbed().setDescription(`This ticket has been taken over by ${message.author}`).setColor(`#52D94F`);
    message.channel.send(e).then(msg => msg.pin({
        reason: `Support Notice - ${message.channel.name.slice(0, 11)} | ${message.member.user.username} took the ticket.`
    }));

    let title = message.channel.name.slice(0, 11);
    if (aliases[message.member.id]) {
        title += `-${aliases[message.member.id]}`
    } else {
        title += `-${message.member.user.username}`
    }
    message.channel.setName(title);
}