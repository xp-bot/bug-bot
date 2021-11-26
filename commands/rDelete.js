const Discord = require(`discord.js`);
const Config = require(`../config.json`);
const djssc = require("djs-slash-commands");

const name = `delete`;
const usage = ``;
const description = `Delete all closed tickets.`;
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
    const channels = guild.channels.cache.array();
    channels.forEach(element => {
        if (element.name.startsWith(`closed-`))
            element.delete();
    });
    interaction.reply(`Deleted!`)
}