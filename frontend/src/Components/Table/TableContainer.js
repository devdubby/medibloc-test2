import React, { Component } from "react";
import TablePresenter from "./TablePresenter";
import { getUserList, deleteUser } from "../../actions";

class TableContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loading: true,
    };
  }
  
  async componentDidMount() {
    try {
      const { data: { users }} = await getUserList();
      this.setState({ users, loading: false });
    } catch (err) {
      const { data: { message }, status, statusText } = err.response;
      alert(message || `${status} ${statusText}`);
    }
  }

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
    const { users, loading } = this.state;

    return (
      <TablePresenter 
        users={users}
        loading={loading}
        onDelete={this.onDelete}
      />
    );
  }
}

export default TableContainer;