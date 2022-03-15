import client from "./axios.config.js";
const userProfile = '/UserProfile';

const update =(id, data) => {
    return client.post('${userProfile}/${id}', data)
}

export {update}