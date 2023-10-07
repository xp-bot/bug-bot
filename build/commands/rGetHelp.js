"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const builders_1 = require("@discordjs/builders");
const discord_js_1 = require("discord.js");
const slash = new builders_1.SlashCommandBuilder()
    .setDefaultMemberPermissions(0)
    .setName(`gethelp`)
    .setDescription(`Check out #get-help to get Support!`);
module.exports = {
    slash,
    execute
};
function execute(interaction) {
    return __awaiter(this, void 0, void 0, function* () {
        const embed = new discord_js_1.MessageEmbed()
            .setColor(`#52D94F`)
            .setTitle('This channel is not for Support!')
            .setDescription('**These are your options:**')
            .addFields([
            {
                name: `Community`,
                value: `Head over to <#925932760936370197> and create a Thread.`,
                inline: true
            },
            {
                name: `Official Support`,
                value: `Create a Ticket in <#853977048698454027>.`,
                inline: true
            }
        ])
            .setImage(`https://cdn.namespace.media/s/Zw4LoTR4KQzz4re/preview`);
        interaction.reply({ embeds: [embed] });
    });
}
