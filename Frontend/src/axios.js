import axios from "axios";
export const userInstance = axios.create({
  baseURL: "http://localhost:8080/user/",
});

export const postInstance = axios.create({
  baseURL: "http://localhost:8080/post/",
});
