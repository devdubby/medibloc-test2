import React, {Component } from "react";
import FormPresenter from "./FormPresenter";
import { validator } from "../../helpers";

class FormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      email: "",
      name: "",
      phoneNumber: "",
      address: "",
      isBtnLoading: false,
      isValidEmail: false,
      isValidName: false,
      isValidPhoneNumber: false,
      isValidAddress: false,
      isValid: false,
    };
  }

  onChange = event => {
    const { id, value } = event.target;

    const isValid = validator(id, value);
    this.setState({ [id]: value, ...isValid });
  };

  onRegister = async event => {
    event.preventDefault();
    const {
      email,
      name,
      phoneNumber,
      address,
      isValid
    } = this.state;

    if (!isValid)
      return;

    const inputUser = {
      email, 
      name, 
      phoneNumber, 
      address
    }
    this.props.onRegister(inputUser);
    this.setState({
      email: "",
      name: "",
      phoneNumber: "",
      address: "",
      isValidEmail: false,
      isValidName: false,
      isValidPhoneNumber: false,
      isValidAddress: false,
      isBtnLoading: true 
    });
    setTimeout(() => {
      this.setState({ isBtnLoading: false });
    }, 1500);
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { isValidEmail, isValidName, isValidPhoneNumber, isValidAddress } = prevState;
    
    if(isValidEmail && isValidName && isValidPhoneNumber && isValidAddress) {
      return { isValid: true };
    } else {
      return { isValid: false };
    }
  }

  render() {
    const {
      email,
      name,
      phoneNumber,
      address,
      isBtnLoading,
      isValidEmail,
      isValidName,
      isValidAddress,
      isValidPhoneNumber,
      isValid
    } = this.state;

    return (
      <FormPresenter 
        email={email}
        name={name}
        phoneNumber={phoneNumber}
        address={address}
        onChange={this.onChange}
        onRegister={this.onRegister}
        isBtnLoading={isBtnLoading}
        isValidEmail={isValidEmail}
        isValidName={isValidName}
        isValidPhoneNumber={isValidPhoneNumber}
        isValidAddress={isValidAddress}
        isValid={isValid}
      />
    );
  }
}

export default FormContainer;