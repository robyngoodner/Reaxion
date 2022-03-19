import client from "./axios.config.js";
const userProfile = '/user';

const update =(id, data) => {
    console.log("in axios", id)
    console.log(data)
    return client.put(`${userProfile}/${id}`)
}

const destroy = (id) => {
    return client.delete(`${userProfile}/${id}`)
}

// const showCommunity = (id) => {
//     console.log('hitting show!')
//     return client.get(`${userProfile}/${id}`)
// }

export {update, destroy};