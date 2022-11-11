import api from "./api";

const list = () => api.get(api.url.category);
const get = (id) => api.get(`${api.url.category}/${id}`);

// const add = (data) => api.post(api.url.categories, data);
// const update = (id, data) => api.put(`${api.url.categories}/${id}`, data);
// const remove = (id) => api.delete(`${api.url.categories}/${id}`);

const categoryService = {
    list,
    get,
    // add,
    // update,
    // remove,
}

export default categoryService;