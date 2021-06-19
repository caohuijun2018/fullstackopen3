import axios from "axios";
const baseUrl = "http://localhost:3002/api/notes";

const getAll = () => {
  const request = axios.get(baseUrl); //promise赋值为request
  return request.then((response) => response.data); //.then()方法返回的仍然是promise
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll,
  create,
  update,
};
