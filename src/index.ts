import { Client, Intents, Message } from "discord.js";
import config from "./config.json";
import { handleReaction } from "./listeners/ReactionListener";
import { assignTicket } from "./systems/TicketHandler";
import { initSubmission } from "./systems/SubmissionHandler";
import { handleCommand } from "./listeners/CommandListener";

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS
    ],
    partials: ["MESSAGE", "CHANNEL", "REACTION"]
});

console.log(`[Bug Bot] Preparing login...`);
client.login(config.token).then(() => {
    console.log(`[Bug Bot] Login successful!`);
});

client.on("messageReactionAdd", (reaction, user) => {
    if (user.bot) return;
    handleReaction(reaction, user);
});

client.on("messageCreate", (message: Message) => {
    if (message.member?.user.bot) return;
    assignTicket(message).then(() => {
    });
    initSubmission(message).then(() => {
    });
    handleCommand(message);
});
