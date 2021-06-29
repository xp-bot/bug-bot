const Discord = require(`discord.js`);
const Config = require(`../config.json`);

const name = `status`;
const usage = ``;
const description = `IF WE HAVE TO WRITE THIS MESSAGE ONE MORE TIME`;
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
    let mem = message.mentions.users.first();
    mem ??= message.mentions.members.first();
    mem ??= "";
    channel.send(`${mem} Please take a look into <#707244138508320801>. Thanks.`)
}