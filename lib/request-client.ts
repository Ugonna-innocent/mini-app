import axios from "axios";

const createApiInstance = (baseURL: string) => {
  const api = axios.create({
    baseURL,
  });

  api.interceptors.response.use(
    (res) => {
      // All logic
      return res;
    },
    async (error) => Promise.reject(error),
  );

  return api;
};

export const restCountriesApi = createApiInstance(
  "https://restcountries.com/v3.1",
);

export const jsonPlaceholderApi = createApiInstance(
  "https://jsonplaceholder.typicode.com",
);
