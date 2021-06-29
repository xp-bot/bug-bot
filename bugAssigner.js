const Discord = require('discord.js');
const octokit = new(require("@octokit/rest").Octokit)({
    auth: "fb501930cbb002f000357c2efa52a2a221686b25",
});
const Config = require(`./config.json`);
let checkedMessages = require(`./checkedMessages.json`);
const fs = require('fs');

// BUGS: 
// SUGG: 11345462
module.exports = {
    bugAssigner
}
/**
 * 
 * @param {Discord.Client} client 
 */
async function bugAssigner(client) {

    client.on('message', message => {
        if (message.content.startsWith(`//`) || message.author.bot)
            return;
        switch (message.channel.id) {
            case Config.channels.bugreports.channel:
            case Config.channels.suggestions.channel:
            case Config.channels.canarybugreports.channel:
                break;
            default:
                return;
        }
        message.react(`790668503299522570`).then(reaction => reaction.message.react(`🔻`));
    });

    client.on('messageReactionAdd', async (reaction, user) => {
        if(!reaction) return;
        if (reaction.message.content.startsWith(`//`) || user.bot)
            return;

        if (!user || !reaction.message.guild.member(user).roles.cache.has(Config.devRolle) || checkedMessages.includes(reaction.message.id)) return;

        if (reaction.emoji.name == `🔻`) {
            checkedMessages.push(reaction.message.id)
            fs.writeFileSync(`./checkedMessages.json`, JSON.stringify(checkedMessages));
            reaction.message.reactions.removeAll().then(msg => msg.react(`792577321068527666`));
            return;
        }
        if (reaction.emoji.id != `790668503299522570`) return;

        const obj = {
            note: ""
        };
        switch (reaction.message.channel.id) {
            case Config.channels.bugreports.channel:
                obj.column_id = Config.channels.bugreports.column;
                break;
            case Config.channels.suggestions.channel:
                obj.column_id = Config.channels.suggestions.column;
                break;
            case Config.channels.canarybugreports.channel:
                obj.column_id = Config.channels.canarybugreports.column;
                obj.note = `*> CANARY <*`
                break;
            default:
                return;
        }

        obj.note += `*Creator: ${reaction.message.author.username}#${reaction.message.author.discriminator}*\n\n${reaction.message.content}`;
        octokit.rest.projects.createCard(obj);

        checkedMessages.push(reaction.message.id)
        fs.writeFileSync(`./checkedMessages.json`, JSON.stringify(checkedMessages));
        reaction.message.reactions.removeAll().then(msg => msg.react(`792577321109422111`));
    });
}