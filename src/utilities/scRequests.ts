import axios from "axios";

export default async function scRequest() {
    const response = await axios.get('http://xp-bot.net:3000/supportcontext', {
        headers: {
            'Authorization': 'Bearer ' + process.env.API_ACCESS,
        }
    });
    if (response.data.success)
        return response.data.content
    return '';
}