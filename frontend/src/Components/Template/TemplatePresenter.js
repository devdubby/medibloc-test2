import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Form from "../Form";
import Table from "../Table";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const TemplatePresenter = ({
  users,
  onRegister,
  onDelete,
  loading,
  onModify
}) => (
  <Container>
    <Form onRegister={onRegister} />
    <Table users={users} onDelete={onDelete} loading={loading} onModify={onModify} />
  </Container>
);

TemplatePresenter.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      email: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      phoneNumber: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired
    }).isRequired
  ),
  onRegister: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

export default TemplatePresenter;
