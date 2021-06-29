const Discord = require(`discord.js`);
const Config = require(`../config.json`);

const name = `aliases`;
const usage = ``;
const description = `List every registered alias.`;
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
    const embed = new Discord.MessageEmbed();
    let msg = `\`\`\`md\n`;
    const initMsg = await message.channel.send(`loading...`);
    for (const property in aliases) {
        msg += `- ${(await message.guild.members.fetch(property)).user.username.replace(/_/g, ``).replace(/\*/g, ``).replace(/~/g, ``)} -> ${aliases[property]}\n`
    }
    initMsg.delete()
    message.channel.send(embed.setDescription(msg + `\`\`\``).setTitle(`Aliases`));
}