import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Loader from "../Loader";
import List from "../List";

const Table = styled.div`
  width: 52%;
  height: 70%;
  display: flex;
  flex-direction: column;
  border: solid 2px black;
  margin: 20px;
  padding: 30px;
  justify-content: ${props => props.loading ? "center" : "flex-start"};
  align-items: center;
`;

const TablePresenter = ({ users, loading, onDelete }) => 
  <Table loading={loading ? 1 : 0}>
    {loading ? (
      <Loader />
    ) : (
      <>
        <List
          id="id"
          email="email"
          name="이름"
          phoneNumber="전화번호"
          address="주소"
        />
        {users &&
          users.map(
            user =>
              !user.deleted && (
                <List
                  key={user.id}
                  id={user.id}
                  email={user.email}
                  name={user.name}
                  phoneNumber={user.phoneNumber}
                  address={user.address}
                  onDelete={onDelete}
                />
              )
          )}
      </>
    )}
  </Table>

TablePresenter.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      email: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      phoneNumber: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired
    }).isRequired
  ),
  loading: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TablePresenter;