import React, {Component } from "react";
import FormPresenter from "./FormPresenter";
import { connect } from "react-redux";
import { registerUser, getUserList, setUserList } from "../../actions";
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

  static getDerivedStateFromProps(nextProps, prevState) {
    const { isValidEmail, isValidName, isValidPhoneNumber, isValidAddress } = prevState;
    
    if(isValidEmail && isValidName && isValidPhoneNumber && isValidAddress) {
      return { isValid: true };
    } else {
      return { isValid: false };
    }
  }

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

    // try {
    //   await registerUser(email, name, phoneNumber, address);
    //   this.setState({
    //     email: "",
    //     name: "",
    //     phoneNumber: "",
    //     address: "",
    //     isBtnLoading: true
    //   });
    //   window.location.reload();
    //   // props로써 getUserList 사용
    // } catch (err) {
    //   const { data: { message }, status, statusText } = err.response;
    //   alert(message || `${status} ${statusText}`);
    // }
    Promise.all([
      registerUser(email, name, phoneNumber, address),
      getUserList()
    ]).then(([data1, data2]) => {
      this.props.setUserList(data2.users);
      this.setState({
        email: "",
        name: "",
        phoneNumber: "",
        address: "",
        isBtnLoading: true
      });
    }).catch(err => {
      const { data: { message }, status, statusText } = err.response;
      alert(message || `${status} ${statusText}`);
    });
  };

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

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUserList: (users) => dispatch(setUserList(users)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormContainer);