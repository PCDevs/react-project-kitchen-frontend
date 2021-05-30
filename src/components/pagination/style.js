import styled from "styled-components";

export const Pagination = styled.ul`
  list-style: none;
  display: flex;
  justify-content: center;
  width: 556px;
  margin: 0 auto;
`;

export const PaginationItem = styled.li`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 64px;
  height: 48px;
  border: 1px solid #373d43;

  ${({ isFirst }) => {
    return (
      isFirst &&
      `
      border-radius: 20px 0 0 20px;
       `
    );
  }}

  ${({ isLast }) => {
    return (
      isLast &&
      `
      border-radius: 0 20px 20px 0;
       `
    );
  }}

  ${({ isActive }) => {
    return (
      isActive &&
      `
       background: #4C4CFF;
       `
    );
  }}

  & > a {
    color: #f2f2f3;
    text-decoration: none;
    font-family: JetBrains Mono;
    font-size: 16px;
    line-height: 24px;
  }
`;
