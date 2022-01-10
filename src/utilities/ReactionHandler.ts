import localSave from "../localsave.json"
import {writeJSON} from "./IOJSON";

export const registerReaction = (data: any, options?: Object) => {
    localSave.reactions[`${data.messageId}${data.emojiId}`] = {
        intent: data.intent,
        options: options
    }
    writeJSON(localSave)
}