import axios from "axios";

export async function restCountriesApi() {
  const api = axios.create({
    baseURL: "https://restcountries.com/v3.1",
  });

  api.interceptors.response.use(
    (res) => res,
    async (error) => Promise.reject(error),
  );

  return api;
}

export async function jsonPlaceholderApi() {
  const api = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
  });

  api.interceptors.response.use(
    (res) => res,
    async (error) => Promise.reject(error),
  );

  return api;
}
