import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

//  token ke header Authorization
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// User APIs
export const registerUser = (userData) => API.post("/user/register", userData);
export const loginUser = (credentials) => API.post("/user/login", credentials);
export const getUserByEmail = (email) => API.get(`/user/${email}`);
export const updateUser = (userData) => API.put("/user", userData);
export const deleteUser = (id) => API.delete(`/user/${id}`);
export const topUpUser = (data) => API.put("/user/topUp", data);

// Item APIs
export const createItem = (itemData) => API.post("/item/create", itemData);
export const updateItem = (itemData) => API.put("/item/update", itemData);
export const deleteItem = (id) => API.delete(`/item/${id}`);
export const getAllItems = () => API.get("/item/getAll");
export const getItemById = (id) => API.get(`/item/${id}`);
export const getItemsByStoreId = (storeId) => API.get(`/item/byStoreId/${storeId}`);

// Store APIs
export const getAllStores = () => API.get("/store/getAll");
export const createStore = (storeData) => API.post("/store/create", storeData);
export const getStoreById = (id) => API.get(`/store/${id}`);
export const updateStore = (storeData) => API.put("/store/update", storeData);

// Transaction APIs
export const createTransaction = (transactionData) => API.post("/transaction/create", transactionData);
export const payTransaction = (transactionId) => API.put("/transaction/pay", { transaction_id: transactionId });
export const deleteTransaction = (id) => API.delete(`/transaction/${id}`);
export const buyItem = (id, quantity) => API.put(`/item/buy/${id}`, { quantity }); // Membeli item

export default API;