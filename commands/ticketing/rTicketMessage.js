const Discord = require(`discord.js`);
const Config = require(`../../config.json`);
const SetupConfig = require(`../../setup.json`);

const name = `tmessage`;
const usage = ``;
const description = `Print the ticket message.`;
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
    const e = new Discord.MessageEmbed().setDescription(`React with <:xp_check:818532849564909658> to open a Ticket.`).setColor(`#52D94F`).setTitle(`XP Support`);
    message.channel.send(e).then(msg => {
        msg.pin({
            reason: `XP Ticketing`
        });
        msg.react(`:xp_check:818532849564909658`);
        SetupConfig.ticket_starter_id = msg.id;
    });
}