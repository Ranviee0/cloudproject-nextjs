import axios from 'axios';

const api = axios.create({
  baseURL: "http://0.0.0.0:8000", // Replace with your FastAPI backend URL
});

export default api;
