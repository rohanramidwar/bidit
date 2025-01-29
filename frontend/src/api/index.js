import axios from "axios"; //used to make api calls

axios.defaults.withCredentials = true;

const API = axios.create({
  baseURL: "http://localhost:5000",
}); //points to backend routes

export const signup = (formData) => API.post("/user/register", formData);
export const login = (formData) => API.post("/user/login", formData);
export const createAuction = (formData) =>
  API.post("/api/create-auction", formData);
