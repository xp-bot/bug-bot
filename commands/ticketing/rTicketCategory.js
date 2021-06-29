const Discord = require(`discord.js`);
const Config = require(`../../config.json`);
const SetupConfig = require(`../../setup.json`);

const name = `category`;
const usage = `<category>`;
const description = `Set the ticket category.`;
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
    if (args.length != 1 || guild.channels.cache.get(args[0]).type != `category`) return `ArgErr`;
    const cat = guild.channels.cache.get(args[0]);
    SetupConfig.ticket_category = cat.id;
    channel.send(new Discord.MessageEmbed().setDescription(`Successfully set the Ticket Category to ${cat}.`).setColor(`#52D94F`).setTitle(`Category Set`))
}