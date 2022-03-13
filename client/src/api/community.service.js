import client from "./axios.config.js";

const communities = '/communities';

const create = (data) => {
    return client.post(`${communities}`, data)
}

export { create }