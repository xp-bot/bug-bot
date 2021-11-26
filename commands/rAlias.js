const Discord = require(`discord.js`);
const Config = require(`../config.json`);
const djssc = require("djs-slash-commands");

const name = `alias`;
const usage = `<member> (alias)`;
const description = `Set or remove an alias.`;
const support = false;
const options = [{
        name: "user",
        description: "The user the alias is for.",
        type: "USER"
    },
    {
        name: "alias",
        description: "The new alias",
        type: "STRING",
        optional: true
    },
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
    if (args.length <= 2) {
        const mentioned = args[0].user;
        if (args.length == 2 && args[0].type == `USER` && args[1].type == `STRING`) {
            aliases[mentioned.id] = args[1].value;
            interaction.reply(new Discord.MessageEmbed().setDescription(`Set ${mentioned}'s alias to **${args[1].value}**.`));
        } else if (args.length == 1 && args[0].type == `USER`) {
            if (aliases[mentioned.id])
                delete aliases[mentioned.id];
                interaction.reply(new Discord.MessageEmbed().setDescription(`Removed ${mentioned}'s alias.`));
        }
    } else {
        return `ArgErr`;
    }
}