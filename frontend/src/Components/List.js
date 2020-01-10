import React from "react";
import styled from "styled-components";

const List = styled.div`
  width: 100%;
  height: 6vh;
  display: flex;
  justify-content: center;
  align-items: center;
  &:nth-child(2n) {
    background-color: #cccccc;
  }
`;

const Item = styled.span`
  margin: 0px 10px;
  width: 95px;
  min-width: 95px;
  text-align: center;
  word-break: keep-all;
  &:nth-child(3n+2) {
    width: 165px;
    min-width: 165px;
  }
`;

const Button = styled.button`
  background-color: red;
  width: 68px;
  height: 35px;
  font-size: 20px;
  color: white;
  outline: none;
  border: none;
  cursor: pointer;
`;

export default ({ id, email, name, phoneNumber, address, onDelete, onModify }) => 
  <List>
    <Item>{id}</Item>
    <Item>{email}</Item>
    <Item>{name}</Item>
    <Item>{phoneNumber}</Item>
    <Item onClick={id === "id" ? null : () => onModify(id)}>{address}</Item>
    <Item>{id === "id" ? "-" : <Button onClick={() => onDelete(id)}>삭제</Button>}</Item>
  </List>