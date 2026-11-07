import axios from "axios";
export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL || "http://localhost:4000/api",
  timeout: 15000,
});
// Do not send demo credentials or real driver data to this starter API.
