import client from "./axios.config.js";

const event = '/event';

const get = (id) => {
    return client.get(`${event}/${id}`)
}

export { get }