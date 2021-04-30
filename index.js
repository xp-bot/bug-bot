const Discord = require('discord.js');
const fs = require('fs');
let aliases = require(`./aliases.json`)
const supportRole = `707246903003447357`;

const client = new Discord.Client();

process.on(`unhandledRejection`, (error, p) => {
	if (error.message == `Missing Permissions`)
	  return;
	console.error(`=== UNHANDLED REJECTION [Shard: ${client.shard.ids[0]}]===`);
	console.error(error.stack);
	console.error(``);
  });

client.on('message', message => {
	if (message.author.bot) return;
	if (!message.member.roles.cache.has(supportRole)) return;
	let prefix = `/`;

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
			for (const property in aliases) {
				message.guild.members.fetch();
				msg += `- ${message.guild.members.cache.get(property).user.username} -> ${aliases[property]}\n`
			}
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
				message.channel.send(`Hey ${mentioned}, if you still need support please specify your problem here!\nOtherwise, we ask you to close this ticket above by pressing the lock and then the green tick to confirm.\n\nKind regards,\nyour XP Team`)
			}
			break;

		default:
			message.channel.send(new Discord.MessageEmbed().setDescription(`\`\`\`md\n${prefix}alias <member> <alias>\n${prefix}aliases\n${prefix}delete\n${prefix}close <member>\`\`\``).setTitle(`Usages`));
			break;
	}
	// other commands...
});

client.on('message', async (message) => {
	if (message.author.bot) return;
	if (!(message.channel.name.startsWith(`ticket-`) && !isNaN(message.channel.name.slice(7).trim()))) return;
	await message.member.fetch();
	if (!message.member.roles.cache.has(supportRole)) return;
	if (message.channel.type != `text`) return;

	let title = message.channel.name;
	if (aliases[message.member.id]) {
		title += `-${aliases[message.member.id]}`
	} else {
		title += `-${message.member.user.username}`
	}
	message.channel.setName(title);
	message.channel.send(title);
});

client.login(`NzkzNjQ3OTM0MDg0MDg3ODA4.X-vUPA.ngTsAE48gRgy8blvyc7s2_5ITFE`);