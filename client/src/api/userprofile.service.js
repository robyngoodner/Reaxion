import client from "./axios.config.js";
const userProfile = '/user';

const update =(id, data) => {
    console.log("in axios")
    console.log("id in userprofile service: ",id)
    console.log("data in userprofile service: ",data)
    return client.put(`${userProfile}/${id}`, data)
}

const destroy = (id) => {
    return client.delete(`${userProfile}/${id}`)
}

export {update, destroy};