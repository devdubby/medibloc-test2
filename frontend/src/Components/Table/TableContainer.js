import React, { Component } from "react";
import TablePresenter from "./TablePresenter";

class TableContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 0,
    }
  }

  onPageClick = (activePage) => {
    this.setState({ activePage });
  }

  handleActivePages = () => {
    const { users } = this.props;
    const pages = Math.floor(users.length / 10);
    const rest = users.length % 10;

    return rest === 0 ? pages : pages + 1;
  }

  render() {
    const { activePage } = this.state;
    const { users, onDelete, loading } = this.props;

    return (
      <TablePresenter 
        users={users}
        loading={loading}
        onDelete={onDelete}
        onPageClick={this.onPageClick}
        activePage={activePage}
        pages={this.handleActivePages()}
      />
    );
  }
}

export default TableContainer;