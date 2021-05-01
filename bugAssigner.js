const Discord = require('discord.js');
const octokit = new(require("@octokit/rest").Octokit)({
    auth: "fb501930cbb002f000357c2efa52a2a221686b25",
});
const Config = require(`./config.json`);

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
        let id = 0;
        const obj = {note: ""};
        switch (message.channel.id) {
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

        obj.note += `*Creator: ${message.author.username}#${message.author.discriminator}*\n\n${message.content}`;

        octokit.rest.projects.createCard(obj);
        message.react(`792577321109422111`);
    });
}