import client from "./axios.config.js";

const post = '/post';

const create = (data) => {
    return client.post(`${post}`, data)
}

const showOne = (id) => {
    return client.get(`${post}/${id}`)
}

const getAll = (data) => {
    return client.get(`${post}`, data)
}

const update = (data, id) => {
    console.log("in axios", id)
    console.log(data)
    return client.put(`${post}/${id}`)
}

const destroy = (id) => {
    console.log(id)
    return client.delete(`${post}/${id}`)
}

export { create, showOne, update, destroy, getAll }