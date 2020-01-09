import { api } from "../common/api";

export const getUserList = () =>
  api.get("users")

export const registerUser = (email, name, phoneNumber, address) => 
  api.post("users", {
    email, 
    name, 
    phoneNumber, 
    address
  });

export const deleteUser = id => 
  api.delete(`users?id=${id}`)

export const modifyAddress = (id, address) =>
  api.put(`users?id=${id}`, {
    address
  });