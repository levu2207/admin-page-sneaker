import api from "./api";

const list = () => api.get(api.url.orders);

const get = (id) => api.get(`${api.url.orders}/${id}`);

const update = (id, data) => api.put(`${api.url.orders}/${id}`, data);

const remove = (id) => api.delete(`${api.url.orders}/${id}`);

const orderService = {
  list,
  get,
  update,
  delete: remove,
};

export default orderService;
