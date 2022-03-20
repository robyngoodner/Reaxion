import client from "./axios.config.js";

const event = '/event';

const get = (data) => {
    console.log("client data", data)
    return client.get(`${event}/${data.eventId}`, data)
}

const create = (data) => {
    return client.post(`${event}/new`, data)
}

const index = (data) => {
    return client.get(`${event}`, data)
}

export { get, create, index }