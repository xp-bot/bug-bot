const Discord = require('discord.js');

module.exports = {
    autoSupport
}

const problems = require(`./autoSupport.json`)

/**
 * 
 * @param {Discord.Message} message 
 */
function autoSupport(message) {
    const embed = new Discord.MessageEmbed();
    for (const problem of problems) {
        const content = message.content.toLowerCase().replace(/[\W_]+/g," ").split(` `);
        // console.log(`${problem.question} > 
        // 1 - ${(problem.needed.every(item => content.includes(item)) || problem.needed.length == 0)} - 
        // 2 - ${problem.keywords.some(item => content.includes(item))} - 
        // 3 - ${problem.some.some(item => content.includes(item))}`);

        if ((problem.needed.every(item => content.includes(item)) || problem.needed.length == 0) && problem.keywords.some(item => content.includes(item)) && problem.some.some(item => content.includes(item))) {
            embed.setDescription(problem.answer)
                .setTitle(problem.question)
                .setColor(`#52D94F`)
                // .setThumbnail(`https://img.namespace.media/images/2021/05/17/BUGBOT.png`)
                .setFooter(`If this automated response was unable to help, stay patient. Support will be with you soon.`);
            message.channel.send(embed);
        }
    }
}