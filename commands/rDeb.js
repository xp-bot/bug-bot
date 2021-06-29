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
    channel.send(`I'm running as ${message.client.user.username}`);
    try {
        channel.send(`Guild name: ` + (await message.client.guilds.fetch(args[0])).name);
    } catch (error) {
        channel.send(`Missing access to ${args[0]}`);
    }
}