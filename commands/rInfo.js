const Discord = require(`discord.js`);
const Config = require(`../config.json`);

const name = `info`;
const usage = `<message>`;
const description = `Leave a notice for your teammates.`;
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
    const m = args.join(` `);
    if (m == ``)
        return `ArgErr`;
    const e = new Discord.MessageEmbed().setDescription(m).setColor(`#52D94F`).setTitle(`Team Notice`).setFooter(`by ${message.author.username}`);
    message.channel.send(e).then(msg => msg.pin({
        reason: `Team Notice - ${m}`
    }));
}