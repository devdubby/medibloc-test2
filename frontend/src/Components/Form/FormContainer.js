import React, {Component } from "react";
import FormPresenter from "./FormPresenter";
import { registerUser } from "../../actions";
import { emailValidator, nameValidator, phoneNumberValidator, addressValidator } from "../../helpers";

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
      isBtnActive: false,
    };
  }

  onChange = event => {
    const { id, value } = event.target;
    const { isValidEmail, isValidName, isValidPhoneNumber, isValidAddress } = this.state;
    const validatorObj = {
      email: emailValidator(value),
      name: nameValidator(value),
      phoneNumber: phoneNumberValidator(value),
      address: addressValidator(value)
    };
    const isValid = validatorObj[id];
    this.setState({ [id]: value, ...isValid });
  };

  onRegister = async event => {
    event.preventDefault();
    const {
      email,
      name,
      phoneNumber,
      address,
      isValidEmail,
      isValidName,
      isValidPhoneNumber,
      isValidAddress
    } = this.state;

    if (
      !isValidEmail ||
      !isValidName ||
      !isValidPhoneNumber ||
      !isValidAddress
    ) {
      return;
    }

    try {
      await registerUser(email, name, phoneNumber, address);
      this.setState({
        email: "",
        name: "",
        phoneNumber: "",
        address: "",
        isBtnLoading: true
      });
      window.location.reload();
    } catch (err) {
      const { data: { message }, status, statusText } = err.response;
      alert(message || `${status} ${statusText}`);
    }
  };

  render() {
    const {
      email,
      name,
      phoneNumber,
      address,
      users,
      isBtnLoading,
      isValidEmail,
      isValidName,
      isValidAddress,
      isValidPhoneNumber
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
      />
    );
  }
}

export default FormContainer;