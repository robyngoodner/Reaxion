import client from "./axios.config.js";

const comment = '/comment';

const get = (id) => {
    return client.get(`${comment}/${id}`)
}

const getAll = () => {
    return client.get(`${comment}`);
};


const create = (data) => {
    return client.post(`${comment}`, data)
}


const update = (id) => {
    return client.put(`${comment}/${id}`)
}

const destroy = (id) => {
    return client.delete(`${comment}/${id}`)
}

export { get, getAll, create, update, destroy }