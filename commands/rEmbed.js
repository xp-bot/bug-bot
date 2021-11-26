const Discord = require(`discord.js`);
const Config = require(`../config.json`);
const djssc = require("djs-slash-commands");

const name = `embed`;
const usage = ``;
const description = `Send an embed message using raw JSON data.`;
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
    let code = args.join(` `);
    if (!code.startsWith(`\`\`\`json`) || !code.endsWith(`\`\`\``)) return `ArgErr`;
    code = code.replace(/```json/, ``);
    code = code.replace(/```/, ``);
    const emb = JSON.parse(code);
    emb.color = "#52D94F";
    channel.send({
        embed: emb
    });
}