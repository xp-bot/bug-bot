import {MessageReaction, PartialMessageReaction, PartialUser, User} from "discord.js";
import localSave from '../localsave.json';
import {openTicket} from "../systems/TicketHandler";

export const handleReaction = (reaction: MessageReaction | PartialMessageReaction, user: User | PartialUser) => {
    console.log(`[Bug Bot] Found incoming Reaction Data`)

    const key = `${reaction.message.id}${reaction.emoji.id || reaction.emoji}`

    if(localSave.reactions[key]) {
        console.log(`[Bug Bot] Found registered Reaction. Action: ${localSave.reactions[key].intent}`)

        switch (localSave.reactions[key].intent) {
            case "open_ticket": {
                openTicket(user, reaction)
                break
            }
            case "close_ticket": {
                //closeTicket()
                break
            }
            case "deny": {
                //denySubmission()
                break
            }
            case "accept_bug": {
                //acceptBug()
                break
            }
            case "accept_suggestion": {
                //acceptSuggestion()
                break
            }
            case "inc_auto_score": {
                //incAutoSupportScore()
                break
            }
            case "dec_auto_score": {
                //decAutoSupportScore()
                //deleteSupportMessage()
                break
            }
        }
    }
}