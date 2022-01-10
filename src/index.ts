import {Client, Intents} from "discord.js";
import config from "./config.json";
import {handleReaction} from "./listeners/ReactionListener";

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MESSAGES],
    partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});

console.log(`[Bug Bot] Preparing login...`)
client.login(config.token).then(r => {
    console.log(`[Bug Bot] Login successful!`)
})

client.on('messageReactionAdd', async (reaction, user) => {
    if (user.bot) return;
    handleReaction(reaction, user)
})