import axios from "axios";

const api = axios.create({
  baseURL: "https://obscure-space-spork-r4wq446r7r7r39w4-3000.app.github.dev",
  withCredentials: true,
});

export default api;