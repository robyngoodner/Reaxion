// setting up config file as an instance of axios, then exporting
import axios from "axios";

const backendAPI = "http://localhost:4000/api";
// const backendAPI = "http://reaxion.herokuapp.com/api"
let user = JSON.parse(localStorage.getItem("user"))

const client = axios.create({
	baseURL: `${backendAPI}`,
	headers: {
		"Content-type": "application/json",
		authorization: `Bearer ${user}`
	},
});

export default client;