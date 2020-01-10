import React, { Component } from "react";
import TablePresenter from "./TablePresenter";

class TableContainer extends Component {
  render() {
    const { users, onDelete, loading } = this.props;

    return (
      <TablePresenter 
        users={users}
        loading={loading}
        onDelete={onDelete}
      />
    );
  }
}

export default TableContainer;