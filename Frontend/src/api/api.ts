import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8081", // Alterar caso o backend esteja em outro domínio
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
