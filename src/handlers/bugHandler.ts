import { Octokit } from '@octokit/rest';
const octokit = new Octokit({
  auth: `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`
});

export default async function bugAssigner() {
  botClient.on('messageCreate', (message) => {
    if (message.content.startsWith(`#`) || message.author.bot) return;
    switch (message.channel.id) {
      case config.channels.bugreports.channel:
      case config.channels.suggestions.channel:
        break;
      default:
        return;
    }
    message
      .react(`790668503299522570`)
      .then((reaction) => reaction.message.react(`🔻`));
  });

  botClient.on('messageReactionAdd', async (reaction, user) => {
    if (!reaction) return;
    if (reaction.message.content?.startsWith(`#`) || user.bot) return;

    if (
      !user ||
      !(await reaction.message.guild?.members.fetch(user.id))?.roles.cache.has(
        config.devRole
      )
    )
      return;

    if (reaction.emoji.name == `🔻`) {
      reaction.message.reactions
        .removeAll()
        .then((msg) => msg.react(`792577321068527666`));
      return;
    }
    if (reaction.emoji.id != `790668503299522570`) return;

    const obj = {
      note: '',
      column_id: 0
    };

    let id = ``;
    switch (reaction.message.channel.id) {
      case config.channels.bugreports.channel:
        obj.column_id = config.channels.bugreports.column;
        id = `BugID: \`ba-${randomIntFromInterval(10000, 99999)}\``;
        break;
      case config.channels.suggestions.channel:
        obj.column_id = config.channels.suggestions.column;
        id = `Sugg.ID: \`sa-${randomIntFromInterval(10000, 99999)}\``;
        break;
    }

    obj.note += `*Creator: ${reaction.message.author?.username}#${reaction.message.author?.discriminator}*\n*${id}*\n\n${reaction.message.content}`;

    octokit.rest.projects.createCard(obj);

    reaction.message.reactions.removeAll().then((msg) => msg.react(`818532849564909658`));
  });
}

function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
