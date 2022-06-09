import axios from "axios";
import config from '../config.json'

export async function sendTrackingData(data: any) {
    await axios.post(config.ilum.url, data, {
        headers: {"ilum-auth": config.ilum.key}
    })
}