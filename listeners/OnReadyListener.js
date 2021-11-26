const Discord = require('discord.js');
const Utils = require(`../Utils`)

/**
 * 
 * @param {Discord.Client} client 
 */
module.exports.onReadyHandler = async (client) => {
	console.log(client.user.username);
	// const guildCmds = await client.SlashCommands.get(null, "707242215579189279");
	//console.log(guildCmds); // Logs all guild commands.

	//const cmds = await client.SlashCommands.get();
	//console.log(cmds); // Logs all slash commands.

	// await client.SlashCommands.delete("805903951957590026");
	try {
		const files = await Utils.fetchFiles(`./commands`);

		const slashs = [];
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
			if (command.options)
				slashs.push({
					name: command.name,
					description: command.description,
					options: command.options
				})
		}
		console.log(slashs);
		client.SlashCommands.bulkAdd(slashs, `707242215579189279`);
	} catch (err) {
		console.error(err);
	}
	console.log(`Commands Loaded!`);
}