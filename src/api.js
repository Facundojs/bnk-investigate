import config from "./infraestructure/config.js";
import axios from "axios";

export const treasureApi = axios.create({
  baseURL: config.API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  auth: {
    username: config.PUBLIC_KEY,
    password: config.SECRET_KEY,
  },
});