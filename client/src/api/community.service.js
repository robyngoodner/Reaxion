import client from "./axios.config.js";

const community = '/community';

const create = (data) => {
    return client.post(`${community}`, data)
}

export { create }