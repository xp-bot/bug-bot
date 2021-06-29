const Discord = require(`discord.js`);
const Config = require(`../config.json`);
const SetupConfig = require(`../setup.json`);
const fs = require('fs');

const name = `backup`;
const usage = ``;
const description = `Backup the bot.`;
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
    fs.writeFileSync(`./aliases.json`, JSON.stringify(aliases));
    fs.writeFileSync(`./setup.json`, JSON.stringify(SetupConfig));
    channel.send(`backed up`);
}