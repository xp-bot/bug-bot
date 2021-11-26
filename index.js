const Discord = require('discord.js');
global.aliases = require(`./aliases.json`);
const BugAssigner = require('./BugAssigner').bugAssigner;
const AutoSupport = require('./AutoSupport').autoSupport;
const TicketListeners = require('./listeners/TicketListeners');
const commandsHandler = require('./listeners/CommandsListener').commandsHandler;
const slashHandler = require('./listeners/CommandsListener').slashHandler;
const onReadyHandler = require('./listeners/OnReadyListener').onReadyHandler;
const Config = require(`./config.json`);
const SetupConfig = require('./setup.json');
global.globalCommands = {};

const interactions = require("discord-slash-commands-client");
const client = new Discord.Client();
BugAssigner(client);

const {
	SlashCommandHandler
} = require("djs-slash-commands");
client.SlashCommands = new SlashCommandHandler(client);

process.on(`unhandledRejection`, (error, p) => {
	if (error.message == `Missing Permissions`)
		return;
	console.error(`=== UNHANDLED REJECTION ===`);
	console.error(error.stack);
	console.error(``);
});

client.on("ready", async () => {
	onReadyHandler(client);
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

client.on("slashCreate", async (interaction) => {
	slashHandler(interaction);
});

client.on('messageReactionAdd', async (reaction, user) => {
	if (user.bot) return;
	TicketListeners.ticketBeginHandler(reaction, user);
	TicketListeners.closeTicketHanlder(reaction, user);
});

client.on('message', async (message) => {
	if (!message.member.user.bot && message.member.id == `524860237979582464`) {
		// message.channel.send(`Welcome <@414755070161453076> | <@&875393646147534909>`, new Discord.MessageEmbed().setTitle(`Thank you for creating a Ticket`).setDescription(`\nSupport will be with you shortly.\n**Please use this time to describe your issue as detailed as possible.**\n\nHave a nice day! <:xpfeaturesmith:851213538440904755>`).setColor(`#52D94F`));

		// await message.channel.send(`<@414755070161453076>`, new Discord.MessageEmbed().setTitle(`Hey Nilstrieb`).setDescription(`**Do you still need support?**\nIf so, please explain your problem here as detailed as possible, so that our team can help you quickly and efficiently.`).setFooter(`React with 🔒 to close the ticket.`).setColor(`#52D94F`)).then(msg => msg.react(`🔒`));

		// message.channel.send(new Discord.MessageEmbed().setDescription(`<@414755070161453076> closed the Ticket.`).setColor(`#52D94F`).setTitle(`Ticket closed`));
	}

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

client.login(Config.botToken);
// client.login(`NzA3NjE3NzA0MDAxMTQyODI1.XrLadQ.gnB8RRdYfB-y8I0h4JOePewyTGw`);