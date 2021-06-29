const Discord = require(`discord.js`);
const Config = require(`../config.json`);

const name = `handover`;
const usage = `<support_member>`;
const description = `Hand the ticket to someone else.`;
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

    if (message.mentions.members.size == 1 && message.mentions.members.first().roles.cache.has(Config.supportRole)) {
        const e = new Discord.MessageEmbed().setDescription(`${message.member} has handed this ticket over to ${message.mentions.members.first()}.`).setColor(`#52D94F`);
        message.channel.send(e).then(msg => msg.pin({
            reason: `Support Notice - ${message.channel.name.slice(0, 11)} | ${message.member.user.username} handed ticket to ${message.mentions.members.first().user.username}.`
        }));

        let title = message.channel.name.slice(0, 11);
        if (aliases[message.member.id]) {
            title += `-${aliases[message.mentions.members.first().id]}`
        } else {
            title += `-${message.mentions.members.first().user.username}`
        }
        message.channel.setName(title);
    } else
        return `ArgErr`;
}