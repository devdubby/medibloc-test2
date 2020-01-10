import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Loader from "../Loader";

const Form = styled.form`
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

const FormPresenter = ({ 
  email,
  name,
  phoneNumber,
  address,
  onChange,
  onRegister,
  isBtnLoading,
  isValidEmail,
  isValidName,
  isValidPhoneNumber,
  isValidAddress,
  isValid
}) =>
  <Form onSubmit={onRegister}>
    <Input
      id="email"
      placeholder="email"
      value={email}
      onChange={event => onChange(event)}
      validation={isValidEmail}
    />
    <Input
      id="name"
      placeholder="이름(2자 이상)"
      value={name}
      onChange={event => onChange(event)}
      validation={isValidName}
      maxLength="10"
    />
    <Input
      id="phoneNumber"
      placeholder="전화번호(-없이 입력)"
      value={phoneNumber}
      onChange={event => onChange(event)}
      validation={isValidPhoneNumber}
      maxLength="11"
    />
    <Input
      id="address"
      placeholder="주소"
      value={address}
      onChange={event => onChange(event)}
      validation={isValidAddress}
    />
    {isBtnLoading ? (
      <Loader />
    ) : (
      <Button
        isBtnActive={isValid}
      >
        생성
      </Button>
    )}
  </Form>

FormPresenter.propTypes = {
  email: PropTypes.string,
  name: PropTypes.string,
  phoneNumber: PropTypes.string,
  address: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onRegister: PropTypes.func.isRequired,
  isBtnLoading: PropTypes.bool.isRequired,
  isValidEmail: PropTypes.bool.isRequired,
  isValidName: PropTypes.bool.isRequired,
  isValidPhoneNumber: PropTypes.bool.isRequired,
  isValidAddress: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
};

export default FormPresenter;
