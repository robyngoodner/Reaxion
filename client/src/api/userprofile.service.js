import client from "./axios.config.js";
const userProfile = '/user';

//awaiting user index for user profile ID 


const show = (data) => {
    return client.get(`${userProfile}`, data)
}

const update =(data, id) => {
    console.log("in axios")
    console.log("id in userprofile service: ",id)
    console.log("data in userprofile service: ",data)
    return client.put(`${userProfile}/${id}`, data)
}

const destroy = (id) => {
    return client.delete(`${userProfile}/${id}`)
}

export {show, update, destroy};

