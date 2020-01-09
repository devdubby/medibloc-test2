import React from "react";
import styled from "styled-components";
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
  justify-content: ${props => (props.loading ? "center" : "flex-start")};
  align-items: center;
`;

const TablePresenter = ({ users, loading, onDelete }) => 
  <Table loading={loading}>
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

export default TablePresenter;