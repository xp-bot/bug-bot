import {Client, Intents, Message, User} from "discord.js";
import config from "./config.json";
import {handleReaction} from "./listeners/ReactionListener";
import {assignTicket} from "./systems/TicketHandler";

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MESSAGES],
    partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});

console.log(`[Bug Bot] Preparing login...`)
client.login(config.token).then(r => {
    console.log(`[Bug Bot] Login successful!`)
})

client.on('messageReactionAdd', (reaction, user) => {
    if (user.bot) return;
    handleReaction(reaction, user)
})

client.on('messageCreate', (message: Message) => {
    if (message.member?.user.bot) return;
    assignTicket(message).then(r => {})
})