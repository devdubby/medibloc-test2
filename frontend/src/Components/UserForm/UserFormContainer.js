import React, { Component } from "react";
import UserFormPresenter from "./UserFormPresenter";
import { getUserList, registerUser, deleteUser } from "../../actions";
import {
  emailValidator,
  nameValidator,
  phoneNumberValidator,
  addressValidator
} from "../../helpers";

class UserFormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      email: "",
      name: "",
      phoneNumber: "",
      address: "",
      users: [],
      error: null,
      loading: true,
      isBtnLoading: false,
      isValidEmail: false,
      isValidName: false,
      isValidPhoneNumber: false,
      isValidAddress: false,
    };
  }

  async componentDidMount() {
    try {
      const { data: { users }} = await getUserList();
      this.setState({ users, loading: false });
    } catch (err) {
      const { data: { message }, status, statusText } = err.response;
      alert(message || `${status} ${statusText}`);
      // this.setState({ error: message || `${status} ${statusText}` });
    }
  }

  onChange = event => {
    const { id, value } = event.target;
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
      // this.setState({ error: message || `${status} ${statusText}` });
    }
  };

  onDelete = async id => {
    if (!window.confirm("정말 삭제 하시겠습니까?")) return;

    try {
      await deleteUser(id);
      this.setState({ loading: true });
      window.location.reload();
    } catch(err) {
      const { data: { message }, status, statusText } = err.response;
      alert(message || `${status} ${statusText}`);
      // this.setState({ error: message || `${status} ${statusText}` });
    }
  };

  render() {
    console.log("state", this.state);
    const {
      email,
      name,
      phoneNumber,
      address,
      users,
      error,
      loading,
      isBtnLoading,
      isValidEmail,
      isValidName,
      isValidAddress,
      isValidPhoneNumber
    } = this.state;
    return (
      <UserFormPresenter
        email={email}
        name={name}
        phoneNumber={phoneNumber}
        address={address}
        users={users}
        error={error}
        loading={loading}
        onChange={this.onChange}
        onRegister={this.onRegister}
        onDelete={this.onDelete}
        isBtnLoading={isBtnLoading}
        isValidEmail={isValidEmail}
        isValidName={isValidName}
        isValidAddress={isValidAddress}
        isValidPhoneNumber={isValidPhoneNumber}
      />
    );
  }
}

export default UserFormContainer;
