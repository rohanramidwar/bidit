import axios from "axios"; //used to make api calls

axios.defaults.withCredentials = true;

const API = axios.create({
  // baseURL: "http://localhost:5000",
  baseURL: "https://bidit-jsro.vercel.app",
}); //points to backend routes

export const signup = (formData) => API.post("/user/register", formData);
export const login = (formData) => API.post("/user/login", formData);

export const createAuction = (formData) =>
  API.post("/api/create-auction", formData);
export const stopAuction = (auctionId) =>
  API.patch(`/api/auctions/${auctionId}/stop`);
export const deleteAuction = (auctionId) =>
  API.delete(`/api/auctions/${auctionId}/delete`);

export const getMyActiveAuctions = (userId) =>
  API.get(`/api/auctions/active/user/${userId}`);
export const getMyEndedAuctions = (userId) =>
  API.get(`/api/auctions/ended/user/${userId}`);

export const getActiveAuctions = () => API.get("/api/auctions/active");
export const getEndedAuctions = () => API.get("/api/auctions/ended");

export const getAuctionById = (id) => API.get(`api/auctions/${id}`);
export const getBidsByItem = (id) => API.get(`api/auctions/${id}/bids`);

export const registerToBid = (id, userData) =>
  API.post(`api/auctions/${id}/register`, userData);
export const placeBid = (id, userData) =>
  API.post(`api/auctions/${id}/bid`, userData);

export const fetchUserOrders = (id) => API.get(`/api/orders/${id}`);
