import axios from "axios";

export default async function scRequest() {
    const response = await axios.get('http://xp-bot.net:3000/supportcontext', { headers: { 'access': config.accessKey } });
    if (response.data.success)
        return response.data.content
    return '';
}