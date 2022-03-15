import client from "./axios.config.js";

const post = '/post';

const create = (data) => {
    return client.post(`${post}`, data)
}

export { create }