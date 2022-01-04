import {Client, Intents} from "discord.js";
import config from "./config.json";

const client = new Client({intents: [Intents.FLAGS.GUILDS]});

console.log(`[Bug Bot] Preparing login...`)
client.login(config.token).then(r => {
    console.log(`[Bug Bot] Login successful!`)
})

client.on('messageReactionAdd', async (reaction, user) => {
    if (user.bot) return;
    
})