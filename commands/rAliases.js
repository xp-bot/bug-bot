const Discord = require(`discord.js`);
const Config = require(`../config.json`);
const djssc = require("djs-slash-commands");

const name = `aliases`;
const usage = ``;
const description = `List every registered alias.`;
const support = false;
const options = [
]

module.exports = {
    name,
    usage,
    description,
    support,
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
    const embed = new Discord.MessageEmbed();
    let msg = `\`\`\`md\n`;
    await interaction.reply(`working...`);
    for (const property in aliases) {
        msg += `- ${(await guild.members.fetch(property)).user.username.replace(/_/g, ``).replace(/\*/g, ``).replace(/~/g, ``)} -> ${aliases[property]}\n`
    }
    // initMsg.delete()
    interaction.followUp(embed.setDescription(msg + `\`\`\``).setTitle(`Aliases`));
}