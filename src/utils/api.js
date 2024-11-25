import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Replace with your FastAPI backend URL
  headers: {
    'Content-Type': 'application/json', // Specify content type
    'Accept': 'application/json',       // Specify accepted response type
  },
});

export default api;
