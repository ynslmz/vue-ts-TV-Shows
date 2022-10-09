import axios from "axios";

export const client = axios.create({
  baseURL: "https://api.tvmaze.com",
});

export function handleError(err: Error) {
  // Handle as you wish
  throw new Error(`Axios Api Error ${err}`);
}

const ApiService = {
  get(url: string) {
    return client?.get(url).catch((err: Error) => handleError(err));
  },
};

export default ApiService;
