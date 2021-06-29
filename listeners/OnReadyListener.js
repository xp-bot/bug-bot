const Discord = require('discord.js');
const Utils = require(`../Utils`)

module.exports.onReadyHandler = async () => {
	try {
		const files = await Utils.fetchFiles(`./commands`);

		for (const file of files) {
			const command = require(`../` + file.filepath);

			if (!command.name)
				continue;

			globalCommands[command.name] = command;
			if (command.officialAliases != null) {
				command.officialAliases.forEach(alias => {
					globalCommandAliases[alias] = command.name;
				});
			}
		}
	} catch (err) {
		console.error(err);
	}
	console.log(`Commands Loaded!`);
}