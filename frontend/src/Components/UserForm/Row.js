import React from "react";
import styled from "styled-components";

const Row = styled.div`
  width: 100%;
  height: 6vh;
  display: flex;
  justify-content: center;
  align-items: center;
  &:nth-child(2n) {
    background-color: #cccccc;
  }
`;

const Column = styled.span`
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

export default ({ id, email, name, phoneNumber, address, onDelete }) => 
  <Row>
    <Column>{id}</Column>
    <Column>{email}</Column>
    <Column>{name}</Column>
    <Column>{phoneNumber}</Column>
    <Column>{address}</Column>
    <Column>{id === "id" ? "-" : <Button onClick={() => onDelete(id)}>삭제</Button>}</Column>
  </Row>