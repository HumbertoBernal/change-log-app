import axios, {  } from "axios";

const API = axios.create({
  baseURL: '/',
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
