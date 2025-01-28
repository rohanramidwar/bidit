import axios from "axios"; //used to make api calls

axios.defaults.withCredentials = true;

const API = axios.create({
  baseURL: "http://localhost:5000/",
}); //points to backend routes
