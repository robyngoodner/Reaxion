import client from "./axios.config.js";

const community = '/community';

const getAll = (data) => {
    return client.get(`${community}/`, data)
}

const create = (data) => {
    return client.post(`${community}`, data)
}

const update = (id, data) => {
    return client.put(`${community}/${id}`, data)
}



export { getAll, create, update }