import axios from "axios";

//const basrUrl = "http://localhost:3001/persons";
const basrUrl = "api/persons";
// const getAll = () => {
//   axios.get(basrUrl).then((response) => {
//     return response.data;
//   });
// };
const getAll = () => {
  const request = axios.get(basrUrl);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(basrUrl, newObject);

  return request.then((response) => response.data);
};

const deleteId = (id) => {
  return axios.delete(`${basrUrl}/${id}`);
};

const updata = (object,id) => {
  const request =  axios.put(`${basrUrl}/${id}`,object) ;
  return request.then(response => response.data)
}
export default {
  getAll,
  create,
  deleteId,
  updata
};
