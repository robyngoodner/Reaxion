import client from "./axios.config.js";
const userProfile = '/users';

const update =(id, data) => {
    return client.post(`${userProfile}/${id}`, data)
}

const destroy = (id) => {
    return client.delete(`${userProfile}/${id}`)
}

export {update, destroy};