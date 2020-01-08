import { api } from "../common/api";

export const getUserList = () =>
  api.get("users")
  .then(res => res.data)
  .catch(err => err.response.data);

export const registerUser = (email, name, phoneNumber, address) => 
  api.post("users", {
    email, 
    name, 
    phoneNumber, 
    address
  });

export const deleteUser = (id) => 
  api.delete(`users?id=${id}`)