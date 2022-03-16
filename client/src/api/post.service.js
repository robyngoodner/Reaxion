import client from "./axios.config.js";

const post = '/post';

const create = (data) => {
    return client.post(`${post}`, data)
}

const showOne = (id) => {
    return client.get(`${post}/${id}`)
}

const update = (id, data) => {
    return client.put(`${post}/${id}`)
}

const destroy = (id) => {
    return client.delete(`${post}/${id}`)
}

export { create, showOne, update, destroy }