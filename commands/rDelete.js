const Discord = require(`discord.js`);
const Config = require(`../config.json`);

const name = `delete`;
const usage = ``;
const description = `Delete all closed tickets.`;
const support = false;
const hideHelp = true;

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
    const channels = message.guild.channels.cache.array();
    channels.forEach(element => {
        if (element.name.startsWith(`closed-`))
            element.delete();
    });
}