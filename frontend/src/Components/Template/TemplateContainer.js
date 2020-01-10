import React, { Component } from "react";
import TemplatePresenter from "./TemplatePresenter";
import { getUserList, registerUser, deleteUser, modifyAddress } from "../../actions";
import { myAlert } from "../../helpers";


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
      myAlert(err);
    }
  };

  onRegister = async (inputUser) => {
    try {
      await registerUser(inputUser);
      const { data: { users }} = await getUserList();
      this.setState({ users });
    } catch (err) {
      myAlert(err);
    }
  };

  onDelete = async id => {
    const { users } = this.state;

    if (!window.confirm("정말 삭제 하시겠습니까?")) return;

    try {
      await deleteUser(id);
    } catch(err) {
      myAlert(err);
    }
    
    const index = users.findIndex(user => user.id === id);
    users.splice(index, 1);
    this.setState({ users });
  };

  onModify = async (id, address) => {
    try {
      await modifyAddress(id, address);
      const { data: { users }} = await getUserList();
      this.setState({ users });
    } catch(err) {
      myAlert(err);
    }
  }

  render() {
    const { users, loading } = this.state;

    return (
      <TemplatePresenter 
        users={users}
        onRegister={this.onRegister}
        onDelete={this.onDelete}
        loading={loading}
        onModify={this.onModify}
      />
    );
  }
}

export default TemplateContainer;