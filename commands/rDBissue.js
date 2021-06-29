const Discord = require(`discord.js`);
const Config = require(`../config.json`);

const name = `dbissue`;
const usage = ``;
const description = `When the backend services got rebooted.`;
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
    const embed = new Discord.MessageEmbed();
    embed.setTitle(`We recently restarted our backend services`).setDescription(`This is most likely the cause of your problem.\n\nIt will return to normal over the next few hours.\nIf the problem persists, please report here again`)
        .setColor(`#52D94F`)
        // .setThumbnail(`https://img.namespace.media/images/2021/05/17/BUGBOT.png`)
        .setFooter(`If this automated answer was unclear, feel free to ask further questions.`);
    message.channel.send(embed);

}