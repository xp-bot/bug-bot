const Discord = require(`discord.js`);
const Config = require(`../config.json`);

const name = `help`;
const description = `Get some help.`;
const usage = ``;
const support = true;
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
    let msg = `\`\`\`md`
    for (const [key, value] of Object.entries(globalCommands)) {
        if (!value.hideHelp) {
            if (msg != `\`\`\`md`)
                msg = `${msg}\n`
            if (value.description != ``)
                msg = `${msg}\n> ${value.description}`
            msg = `${msg}\n${Config.prefix}${key} ${value.usage}`;
        }
    }
    msg = `${msg}\n\`\`\``
    message.channel.send(new Discord.MessageEmbed().setDescription(msg).setTitle(`Usages`));
}