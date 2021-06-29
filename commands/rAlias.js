const Discord = require(`discord.js`);
const Config = require(`../config.json`);

const name = `alias`;
const usage = `<member> (alias)`;
const description = `Set or remove an alias.`;
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
    if (args.length <= 2 && message.mentions.members.array().length == 1) {
        const mentioned = message.mentions.members.last();
        if (args.length == 2) {
            aliases[mentioned.id] = args[1];
            message.channel.send(new Discord.MessageEmbed().setDescription(`Set ${mentioned}'s alias to **${args[1]}**.`));
        } else if (args.length == 1){
            if(aliases[mentioned.id])
            delete aliases[mentioned.id];
            message.channel.send(new Discord.MessageEmbed().setDescription(`Removed ${mentioned}'s alias.`));
        }
    } else {
        return `ArgErr`;
    }
}