import axios from "axios";

const api = axios.create({
  // URL adaptada para GitHub Codespaces (Puerto 3000 del backend)
  baseURL: "https://obscure-space-spork-r4wq446r7r7r39w4-3000.app.github.dev",
  withCredentials: true, // Importante para enviar cookies/sesiones entre dominios
});

export default api;
