import { api } from "./client";

export const loginRequest = (email, password) =>
  api.post("/login", { email, password });

export const registerRequest = (payload) => api.post("/register", payload);

export const meRequest = () => api.get("/me");

export const logoutRequest = () => api.post("/logout");
