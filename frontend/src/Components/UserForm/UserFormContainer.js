import React, { Component } from "react";
import UserFormPresenter from "./UserFormPresenter";
import { getUserList, registerUser, deleteUser } from "../../actions";
import {
  emailValidator,
  nameValidator,
  numberValidator,
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
      isEmailValidation: false,
      isNameValidation: false,
      isNumberValidation: false,
      isAddressValidation: false
    };
  }

  async componentDidMount() {
    try {
      const { data: users } = await getUserList();
      this.setState({ users });
    } catch {
      this.setState({ error: "Something error arise!" });
    } finally {
      this.setState({ loading: false });
    }
  }

  onChange = event => {
    const { id, value } = event.target;
    switch (id) {
      case "email":
        const isEmailValidation = emailValidator(value);
        this.setState({ isEmailValidation });
        break;
      case "name":
        const isNameValidation = nameValidator(value);
        this.setState({ isNameValidation });
        break;
      case "phoneNumber":
        const isNumberValidation = numberValidator(value);
        this.setState({ isNumberValidation });
        break;
      case "address":
        const isAddressValidation = addressValidator(value);
        this.setState({ isAddressValidation });
        break;
      default:
        break;
    }
    this.setState({ [id]: value });
  };

  onRegister = async event => {
    event.preventDefault();
    const {
      email,
      name,
      phoneNumber,
      address,
      isEmailValidation,
      isNameValidation,
      isNumberValidation,
      isAddressValidation
    } = this.state;

    if (
      !isEmailValidation ||
      !isNameValidation ||
      !isNumberValidation ||
      !isAddressValidation
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

  onDelete = async id => {
    if (!window.confirm("정말 삭제 하시겠습니까?")) return;

    try {
      await deleteUser(id);
      this.setState({ loading: true });
      window.location.reload();
    } catch(err) {
      const { data: { message }, status, statusText } = err.response;
      alert(message || `${status} ${statusText}`);
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
      isEmailValidation,
      isNameValidation,
      isAddressValidation,
      isNumberValidation
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
        isEmailValidation={isEmailValidation}
        isNameValidation={isNameValidation}
        isAddressValidation={isAddressValidation}
        isNumberValidation={isNumberValidation}
      />
    );
  }
}

export default UserFormContainer;
