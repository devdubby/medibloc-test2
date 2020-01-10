import React, { Component } from "react";
import TemplatePresenter from "./TemplatePresenter";
import { getUserList, registerUser, deleteUser } from "../../actions";


class TemplateContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loading: true,
    }
  }

  componentDidMount() {
    this.myGetUserList();
  };

  myGetUserList = async () => {
    try {
      const { data: { users }} = await getUserList();
      this.setState({ users, loading: false });
    } catch (err) {
      const { data: { message }, status, statusText } = err.response;
      alert(message || `${status} ${statusText}`);
    }
  };

  onRegister = async (email, name, phoneNumber, address, isValid) => {
    try {
      await registerUser(email, name, phoneNumber, address);
      const { data: { users }} = await getUserList();
      this.setState({ users });
    } catch (err) {
      const { data: { message }, status, statusText } = err.response;
      alert(message || `${status} ${statusText}`);
    }
  };

  onDelete = async id => {
    const { users } = this.state;

    if (!window.confirm("정말 삭제 하시겠습니까?")) return;

    try {
      await deleteUser(id);
    } catch(err) {
      const { data: { message }, status, statusText } = err.response;
      return alert(message || `${status} ${statusText}`);
    }
    
    const index = users.findIndex(user => user.id === id);
    users.splice(index, 1);
    this.setState({ users });
  };

  render() {
    const { users, loading } = this.state;

    return (
      <TemplatePresenter 
        users={users}
        onRegister={this.onRegister}
        onDelete={this.onDelete}
        loading={loading}
      />
    );
  }
}

export default TemplateContainer;