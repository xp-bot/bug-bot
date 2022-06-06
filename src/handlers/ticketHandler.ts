import { Octokit } from '@octokit/rest';
const octokit = new Octokit({
  auth: `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`
});

export default async function ticketHandler() {
  botClient.on('messageCreate', async (message) => {
   
    if (message.member?.user.bot || message.channel.type !== `GUILD_TEXT`) return;
    if (!(message.channel.name.startsWith(`ticket-`) && !isNaN(parseInt(message.channel.name.slice(7).trim())))) return;
    await message.member?.fetch();
    if (!message.member?.roles.cache.has(config.supportRole)) return;

    let title = message.channel.name;
    if ((config.aliases as any)[message.member.id]) {
        title += `-${(config.aliases as any)[message.member.id]}`;
    } else {
        title += `-${message.member.user.username}`;
    }
    message.channel.setName(title);
  });
}