import React from "react";
import styled from "styled-components";
import Row from "./Row";
import Loader from "../../Loader";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const InputContainer = styled.form`
  width: 25%;
  height: 52%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: solid 2px black;
  margin: 20px;
`;

const Input = styled.input`
  width: 52%;
  height: 36px;
  margin-bottom: 10px;
  font-size: 20px;
  border-radius: 3px;
  border: solid black 1px;
  color: ${props => (props.validation ? "black" : "red")};
`;

const TableContainer = styled.div`
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

const Button = styled.button`
  background-color: ${props => (props.isBtnActive ? "#0096ff" : "gray")};
  width: 77px;
  height: 43px;
  font-size: 20px;
  color: white;
  outline: none;
  border: none;
  cursor: pointer;
`;

const UserFormPresenter = ({
  email,
  name,
  phoneNumber,
  address,
  users,
  error,
  loading,
  onChange,
  onRegister,
  onDelete,
  isBtnLoading,
  isEmailValidation,
  isNameValidation,
  isNumberValidation,
  isAddressValidation,
}) => (
  <Container>
    <InputContainer onSubmit={onRegister}>
      <Input
        id="email"
        placeholder="email"
        value={email}
        onChange={event => onChange(event)}
        validation={isEmailValidation}
      />
      <Input
        id="name"
        placeholder="이름(2자 이상)"
        value={name}
        onChange={event => onChange(event)}
        validation={isNameValidation}
      />
      <Input
        id="phoneNumber"
        placeholder="전화번호(-없이 입력)"
        value={phoneNumber}
        onChange={event => onChange(event)}
        validation={isNumberValidation}
      />
      <Input
        id="address"
        placeholder="주소"
        value={address}
        onChange={event => onChange(event)}
        validation={isAddressValidation}
      />
      {isBtnLoading ? (
        <Loader />
      ) : (
        <Button
          isBtnActive={
            isEmailValidation &&
            isNameValidation &&
            isNumberValidation &&
            isAddressValidation
          }
        >
          생성
        </Button>
      )}
    </InputContainer>
    <TableContainer loading={loading}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Row
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
                  <Row
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
    </TableContainer>
  </Container>
);

export default UserFormPresenter;
