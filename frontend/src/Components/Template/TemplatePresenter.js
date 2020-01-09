import React from "react";
import styled from "styled-components";
import Form from "../Form";
import Table from "../Table";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const TemplatePresenter = () => (
  <Container>
    <Form />
    <Table />
  </Container>
);

export default TemplatePresenter;
