import React, { Component } from "react";
import { connect } from "react-redux";
import TablePresenter from "./TablePresenter";
import { getUserList, setUserList, deleteUser } from "../../actions";

class TableContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }
  
  async componentDidMount() {
    getUserList().then(res => {
      const { users } = res.data;
      this.props.setUserList(users);
      this.setState({ loading: false });
    }).catch(err => {
      const { data: { message }, status, statusText } = err.response;
      alert(message || `${status} ${statusText}`);
    });
  }

  onDelete = async id => {
    const { users } = this.state;

    if (!window.confirm("정말 삭제 하시겠습니까?")) return;

    try {
      await deleteUser(id);
    } catch(err) {
      const { data: { message }, status, statusText } = err.response;
      alert(message || `${status} ${statusText}`);
    }
    
    const index = users.findIndex(user => user.id === id);
    users.splice(index, 1);
    this.setState({ users });
  };

  render() {
    const { loading } = this.state;
    const { users } = this.props;

    return (
      <TablePresenter 
        users={users}
        loading={loading}
        onDelete={this.onDelete}
      />
    );
  }
}

const mapStateToProps = state => {
  const { users } = state.users;
  return {
    users
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUserList: (users) => dispatch(setUserList(users)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableContainer);