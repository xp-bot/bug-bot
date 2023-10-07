import { Octokit } from '@octokit/rest';
const octokit = new Octokit({
  auth: `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`
});

export default async function ticketHandler() {
  botClient.on('messageCreate', async (message) => {
    if (message.member?.user.bot || message.channel.type !== `GUILD_TEXT`)
      return;
    if (
      message.channel.name.length > 11 ||
      !(
        message.channel.name.startsWith(`ticket-`) &&
        !isNaN(parseInt(message.channel.name.slice(7).trim()))
      )
    )
      return;
    await message.member?.fetch();
    if (!message.member?.roles.cache.has(process.env.SUPPORT_ROLE || '')) return;

    let title = message.channel.name;
    const alias = process.env[`ALIAS_${message.member.id}`]
    if (alias) {
      title += `-${alias}`;
    } else {
      title += `-${message.member.user.username}`;
    }
    message.channel.setName(title);
  });
}
