import client from "./axios.config";

const auth = "/auth";
const users = "/users";

const register = (email, password, firstName, lastName) => {
    return client
    .post(`${auth}/register`, {email,password,firstName,lastName})
    .then((res) => {console.log(res)})
}


const login = (email, password) => {
    try {
        return client
        .post(`${auth}/login`, {email,password})
        .then((res) => {
            if(res.data.token) {
                console.log(res.data.message)
                localStorage.setItem("user", JSON.stringify(res.data.token))
            }
            return res.data.token;
        })
    }catch(err){
        console.log(err)
    }
}

const currentUser = () => {
    let user = localStorage.getItem("user");
    return JSON.parse(user)
}

const getProfile = () => {
    return client.get(`${users}/profile`)
}

const logout = () => {
    localStorage.removeItem("user")
}

export {register, login, currentUser, getProfile, logout}