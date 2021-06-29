const Discord = require('discord.js');
global.aliases = require(`./aliases.json`);
const BugAssigner = require('./BugAssigner').bugAssigner;
const AutoSupport = require('./AutoSupport').autoSupport;
const TicketListeners = require('./listeners/TicketListeners');
const commandsHandler = require('./listeners/CommandsListener').commandsHandler;
const onReadyHandler = require('./listeners/OnReadyListener').onReadyHandler;
const Config = require(`./config.json`);
const SetupConfig = require('./setup.json');
global.globalCommands = {};

const client = new Discord.Client();
BugAssigner(client);

process.on(`unhandledRejection`, (error, p) => {
	if (error.message == `Missing Permissions`)
		return;
	console.error(`=== UNHANDLED REJECTION ===`);
	console.error(error.stack);
	console.error(``);
});

client.on("ready", async () => {
	onReadyHandler();
});

client.on('message', async (message) => {
	if (message.type === "PINS_ADD" && message.author.id == client.user.id) {
		message.delete();
		return;
	}
	if (message.author.bot) return;
	commandsHandler(message);
	TicketListeners.assignHandler(message);
});

client.on('messageReactionAdd', async (reaction, user) => {
	if (user.bot) return;
	TicketListeners.ticketBeginHandler(reaction, user);
	TicketListeners.closeTicketHanlder(reaction, user);
});

client.on('message', async (message) => {
	if (!message.member.roles.cache.has(Config.supportRole) && !(message.content.startsWith(`.xp `) || message.content.startsWith(`.c `) || message.content.startsWith(`.dp `)))
		AutoSupport(message);
});

client.on('raw', packet => {
	if (!['MESSAGE_REACTION_ADD'].includes(packet.t)) return;
	const channel = client.channels.cache.get(packet.d.channel_id);
	if (channel.messages.cache.has(packet.d.message_id)) return;
	channel.messages.fetch(packet.d.message_id).then(message => {
		// const emoji = packet.d.emoji.id ? `${packet.d.emoji.name}:${packet.d.emoji.id}` : packet.d.emoji.name;
		let emoji = packet.d.emoji.id;
		emoji ??= packet.d.emoji.name;
		const reaction = message.reactions.cache.get(emoji);
		if (reaction) reaction.users.cache.set(packet.d.user_id, client.users.cache.get(packet.d.user_id));
		if (packet.t === 'MESSAGE_REACTION_ADD') {
			client.emit('messageReactionAdd', reaction, client.users.cache.get(packet.d.user_id));
		}
	});
});

// client.login(Config.botToken);
client.login(`NzIxODg3OTc3ODM5NTI1OTc5.XubEkQ.QrRcneyOy6bQBxyzR4PRT68zk9Q`);