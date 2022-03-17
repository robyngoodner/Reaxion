import client from "./axios.config.js";

const community = '/community';


const create = (data) => {
    return client.post(`${community}`, data)
}

const update = (id, data) => {
    return client.put(`${community}/${id}`, data)
}

export { create, update }