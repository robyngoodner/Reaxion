import client from "./axios.config.js";

const event = '/event';

const get = (id, data) => {
    // console.log("client id", id)
    return client.get(`${event}/${id}`, data)
}

const getAll = (data) => {
    // console.log("client id", id)
    return client.get(`${event}`, data)
}

const create = (data) => {
    return client.post(`${event}/new`, data)
}

const index = (data) => {
    return client.get(`${event}`, data)
}

export { get, getAll, create, index }