import client from "./axios.config.js";
const userProfile = '/user';

const update =(id, data) => {
    return client.put(`${userProfile}/${id}`, data)
}

const destroy = (id) => {
    return client.delete(`${userProfile}/${id}`)
}

export {update, destroy};