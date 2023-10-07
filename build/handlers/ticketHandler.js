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
const rest_1 = require("@octokit/rest");
const octokit = new rest_1.Octokit({
    auth: `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`
});
function ticketHandler() {
    return __awaiter(this, void 0, void 0, function* () {
        botClient.on('messageCreate', (message) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            if (((_a = message.member) === null || _a === void 0 ? void 0 : _a.user.bot) || message.channel.type !== `GUILD_TEXT`)
                return;
            if (message.channel.name.length > 11 ||
                !(message.channel.name.startsWith(`ticket-`) &&
                    !isNaN(parseInt(message.channel.name.slice(7).trim()))))
                return;
            yield ((_b = message.member) === null || _b === void 0 ? void 0 : _b.fetch());
            if (!((_c = message.member) === null || _c === void 0 ? void 0 : _c.roles.cache.has(process.env.SUPPORT_ROLE || '')))
                return;
            let title = message.channel.name;
            const alias = process.env[`ALIAS_${message.member.id}`];
            if (alias) {
                title += `-${alias}`;
            }
            else {
                title += `-${message.member.user.username}`;
            }
            message.channel.setName(title);
        }));
    });
}
exports.default = ticketHandler;
