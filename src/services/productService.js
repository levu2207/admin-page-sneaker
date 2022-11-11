import api from "./api";

const list = () => api.get(api.url.products);
const get = (id) => api.get(`${api.url.products}/${id}`);

const add = (formData) => {
  return api.post(api.url.products, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const search = (search) =>
  api.get(api.url.products, { params: { page: 1, limit: 50, search } });

const update = (id, formData) => {
  return api.put(`${api.url.products}/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const remove = (id) => api.delete(`${api.url.products}/${id}`);

const productService = {
  list,
  get,
  add,
  search,
  update,
  delete: remove,
};

export default productService;
