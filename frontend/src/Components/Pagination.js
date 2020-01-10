import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
  width: 100%;
  height: 6vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NumberText = styled.span`
  color: ${props => props.isActive ? "black" : "#7295bd"};
  font-size: 18px;
  width: 20px;
  cursor: pointer;
  &:hover {
    color: black;
  }
  text-align: center;
`;

const Button = styled.button`
  margin: 0px 5px;
`;

const Pagination = ({
  activePage,
  onPageClick,
  pages
}) => 
  <Container>
    <Button>{`<`}</Button>
    <Number activePage={activePage} pages={pages} onPageClick={onPageClick} />
    <Button>{`>`}</Button>
  </Container>

const Number = ({ activePage, pages, onPageClick }) => {
  const item = [];
  for(let i = 0; i < pages; i++) {
    item.push(<NumberText key={`number${i+1}`} isActive={activePage === i ? true : false} onClick={() => onPageClick(i)}>{i+1}</NumberText>)
  }
  return item;
}

Pagination.propTypes = {
  activePage: PropTypes.number.isRequired,
  onPageClick: PropTypes.func.isRequired,
  pages: PropTypes.number.isRequired
};

export default Pagination;
