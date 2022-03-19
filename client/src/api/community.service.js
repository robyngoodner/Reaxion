import client from "./axios.config.js";

const community = '/community';

const getAll = (data, id) => {
    return client.get(`${community}/${id}`, data)
}

const getCommunities = (data) => {
    return client.get(`${community}`, data)
}

const create = (data) => {
    return client.post(`${community}`, data)
}

const update = (id, data) => {
    return client.put(`${community}/${id}`, data)
}



export { getAll, getCommunities, create, update }