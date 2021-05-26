const Discord = require('discord.js');
const fs = require('fs');
let aliases = require(`./aliases.json`);
const BugAssigner = require('./BugAssigner').bugAssigner;
const AutoSupport = require('./AutoSupport').autoSupport;
const Config = require(`./config.json`);

const client = new Discord.Client();
BugAssigner(client);

process.on(`unhandledRejection`, (error, p) => {
	if (error.message == `Missing Permissions`)
		return;
	console.error(`=== UNHANDLED REJECTION ===`);
	console.error(error.stack);
	console.error(``);
});

client.on('message', async message => {
	if (message.author.bot) return;
	if (!message.member.roles.cache.has(Config.supportRole)) return;
	let prefix = `-`;

	if (!message.content.startsWith(prefix)) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	switch (command) {
		case `alias`:
			if (args.length == 2 && message.mentions.members.array().length == 1) {
				const mentioned = message.mentions.members.last();
				aliases[mentioned.id] = args[1];
				message.channel.send(new Discord.MessageEmbed().setDescription(`Set ${mentioned}'s alias to **${args[1]}**.`));
				fs.writeFileSync(`./aliases.json`, JSON.stringify(aliases));
			}
			break;
		case `aliases`:
			const embed = new Discord.MessageEmbed();
			let msg = `\`\`\`md\n> Aliases\n`;
			const initMsg = await message.channel.send(`loading...`);
			for (const property in aliases) {
				msg += `- ${(await message.guild.members.fetch(property)).user.username.replace(/_/g, ``)} -> ${aliases[property]}\n`
			}
			initMsg.delete()
			message.channel.send(embed.setDescription(msg + `\`\`\``));
			break;

		case `delete`:
			message.guild.fetch();
			const channels = message.guild.channels.cache.array();
			channels.forEach(element => {
				if (element.name.startsWith(`closed-`))
					element.delete();
			});
			break;

		case `close`:
			if (args.length == 1 && message.mentions.members.array().length == 1) {
				const mentioned = message.mentions.members.last();
				message.delete();
				await message.channel.send(`Hey ${mentioned}, if you still need support please specify your problem here!\nOtherwise, we ask you to close this ticket above by pressing :lock: and then :white_check_mark: to confirm.`)
				message.channel.send(`https://img.namespace.media/images/2021/05/14/rPvMxvOEmz.gif`);
			}
			break;

		case `reboot`:
			if (message.member.id == `265849018662387712` || message.member.id == `524860237979582464`)
				message.react(`👋`).then(ye => process.exit());
			break;

		case `help`:
			message.channel.send(new Discord.MessageEmbed().setDescription(`\`\`\`md\n${prefix}alias <member> <alias>\n${prefix}aliases\n${prefix}delete\n${prefix}close <member>\`\`\``).setTitle(`Usages`));
			break;
	}
	// other commands...
});

client.on('message', async (message) => {
	if (message.author.bot) return;
	// if (!message.member.roles.cache.has(Config.supportRole))
	AutoSupport(message);

	if (!(message.channel.name.startsWith(`ticket-`) && !isNaN(message.channel.name.slice(7).trim()))) return;
	await message.member.fetch();
	if (!message.member.roles.cache.has(Config.supportRole)) return;
	if (message.channel.type != `text`) return;

	let title = message.channel.name;
	if (aliases[message.member.id]) {
		title += `-${aliases[message.member.id]}`
	} else {
		title += `-${message.member.user.username}`
	}
	message.channel.setName(title);
});

client.on("channelCreate", function (channel) {
	if (!(channel.type == `text` && channel.name.startsWith(`ticket-`))) return;
	channel.guild.roles.fetch();
	channel.send(`<:staff:725039207172669461> Hey there,\nThank you for creating a Ticket.\n**Please already describe your Issue here and try to be as detailed as possible**.\n:coffee: ${channel.guild.roles.cache.get(`707246903003447357`)} has been notified, have a nice day!`)
});

client.login(Config.botToken);