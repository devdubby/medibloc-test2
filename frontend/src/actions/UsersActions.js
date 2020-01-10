import { api } from "../common/api";

export const getUserList = () => api.get("users");

export const registerUser = (inputUser) => 
  api.post("users", inputUser);

export const deleteUser = id => 
  api.delete(`users?id=${id}`)

export const modifyAddress = (id, address) =>
  api.put(`users?id=${id}`, {
    address
  });