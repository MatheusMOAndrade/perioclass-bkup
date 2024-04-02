import axios from "axios";

const baseUrl = "";

const getOptions = (method: string, url: string, data?: any) => {
  const options: any = {
    method: method,
    headers: { "Content-Type": "application/json", "session-token": window.sessionStorage.getItem('sessionToken') },
    url: baseUrl + url,
  };

  if (data) {
    options.data = data;
  }

  return options;
};

export const api = {
  get: async (endpoint: string) => await axios.request(getOptions("GET", endpoint)),
  post: async (data: any, endpoint: string) =>
    await axios.request(getOptions("POST", endpoint, data)),
  delete: async (endpoint: string) =>
    await axios.request(getOptions("DELETE", endpoint)),
  put: async (data: any, endpoint: string) =>
    await axios.request(getOptions("PUT", endpoint, data)),
  patch: async (data: any, endpoint: string) =>
    await axios.request(getOptions("PATCH", endpoint, data)),
};
