import config from '../config.json';
import { ApplicationCommand, Message, PartialMessage } from "discord.js";

export const cmdDebug = async (message: Message | PartialMessage) => {
    await message.member?.fetch();
    if (message.member?.roles.cache.has(config.devRole)) {
        await message.client.application?.commands.fetch({guildId: '707242215579189279'})

        message.client.application?.commands.fetch('873507837798674442') // id of your command
            .then( (command) => {
                console.log(`Fetched command ${command.name}`)
                // further delete it like so:
                command.delete()
                console.log(`Deleted command ${command.name}`)
            }).catch(console.error);
    }
};
