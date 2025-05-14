import axios, { AxiosRequestConfig, CanceledError } from "axios";

export interface DataResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api",
});

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = (config: AxiosRequestConfig) =>
    axiosInstance
      .get<DataResponse<T>>(this.endpoint, config)
      .then((res) => res.data);
}

export { CanceledError };

export default APIClient;
