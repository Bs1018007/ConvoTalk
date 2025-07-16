import axios from "axios";

const BASE_URL = import.meta.env.MODE === "development"
  ? "http://localhost:3000"
  : "http://54-234-229-97.nip.io:3000";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, 
});
