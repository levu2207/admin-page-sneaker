import axios from "axios";
import store from "../store/index";
import { showLoading, hideLoading } from "react-redux-loading-bar";

const url = {
  baseUrl: process.env.REACT_APP_API_BASE_URL,
  login: "/users/login",
  products: "/products",
  category: "/category",
  orders: "/orders",
};

const instance = axios.create({
  baseURL: url.baseUrl,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

instance.interceptors.request.use((request) => {
  const state = store.getState();
  if (state.auth.token) {
    request.headers.token = `${state.auth.token}`;
  }
  store.dispatch(showLoading());
  return request;
});

instance.interceptors.response.use(
  (response) => {
    setTimeout(() => store.dispatch(hideLoading()), 100);
    return response.data;
  },
  (error) => {
    setTimeout(() => store.dispatch(hideLoading()), 100);
    if (error.response || error.response.status === 404) {
      return error.response.data;
    } else {
      return Promise.reject(error);
    }
  }
);

const api = {
  url,
  post: instance.post,
  get: instance.get,
  put: instance.put,
  delete: instance.delete,
  patch: instance.patch,
  promise: axios.all,
  spread: axios.spread,
};

export default api;
