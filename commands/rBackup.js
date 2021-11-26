const Discord = require(`discord.js`);
const Config = require(`../config.json`);
const SetupConfig = require(`../setup.json`);
const fs = require('fs');
const djssc = require("djs-slash-commands");

const name = `backup`;
const usage = ``;
const description = `Backup the bot.`;
const support = false;
const options = [
]
const hideHelp = true;

module.exports = {
    name,
    usage,
    description,
    support,
    hideHelp,
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
    fs.writeFileSync(`./aliases.json`, JSON.stringify(aliases));
    fs.writeFileSync(`./setup.json`, JSON.stringify(SetupConfig));
    interaction.reply(`backed up`);
}