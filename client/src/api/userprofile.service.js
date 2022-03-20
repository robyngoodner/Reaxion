import client from "./axios.config.js";
const userProfile = '/user';

//awaiting user index for user profile ID 


const show = (id) => {
    return client.get(`${userProfile}/${id}`, id)
}

const update =(data, id) => {
  
    return client.put(`${userProfile}/${id}`, data)
}

const destroy = (id) => {
    return client.delete(`${userProfile}/${id}`)
}

export {show, update, destroy};

