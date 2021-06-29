const Discord = require('discord.js');
const Config = require('../config.json');

/**
 * 
 * @param {Discord.Message} message 
 * @returns 
 */
module.exports.commandsHandler = async (message) => {
	try {
		const channel = message.channel;
		const guild = message.guild;
		const member = message.member;

		if (message.deleted) return;

		if (message.author.bot) return;

		if (!message.content.startsWith(Config.prefix)) return;

		const args = message.content.replace(/[ ]+/g, ` `).slice(Config.prefix.length).trim().split(` `);
		let command = args.shift().toLowerCase();

		if (command == ``) return;

		command = globalCommands[command];

		let permitted = false;
		if (!command) return;
		message.delete();
		if (command.support && member.roles.cache.get(Config.supportRole)) {
			permitted = true;
		}
		if (member.roles.cache.get(Config.devRolle)) {
			permitted = true;
		}
		if (!permitted) {
			return;
		}

		if (channel.type !== `text`) {
			return;
		}
		try {
			const res = await command.execute(message, args, member, channel, guild);
			if (res == `ArgErr`)
				message.channel.send(new Discord.MessageEmbed().setDescription(`\`\`\`md\n> ${command.description}\n${Config.prefix}${command.name} ${command.usage}\`\`\``));
		} catch (error) {
			console.error(error);
		}
	} catch (error) {

	}
}