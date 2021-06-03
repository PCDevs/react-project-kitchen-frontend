import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import styled from "styled-components";

const TabList = styled.ul`
  list-style: none;
  display: flex;
  margin: 32px auto 0 auto;
  padding: 0;
  border-bottom: 1px solid rgba(242, 242, 243, 0.4);
`;

const Tab = styled.li`
  padding: 0 24px 12px 24px;
  ${({ isActive }) => {
    return isActive && ` border-bottom: 3px solid rgba(76, 76, 255, 1);`;
  }}

  & > a {
    color: #f2f2f3;
    font-family: JetBrains Mono;
    font-size: 16px;
    line-height: 24px;
  }
  & > a:hover {
    text-decoration: none;
  }
`;

const Tabs = (props) => {
  const { path } = useRouteMatch();
  const isUser = props.currentUser.username === props.profile.username;
  return (
    <TabList>
      <Tab isActive={path === "/@:username"}>
        <Link to={`/@${props.profile.username}`}>{isUser ? `Ваши посты` : `Посты ${props.profile.username}`}</Link>
      </Tab>
      {isUser && <Tab isActive={path === "/@:username/favorites"}>
        <Link to={`/@${props.profile.username}/favorites`}>Любимые посты</Link>
      </Tab>}
    </TabList>
  );
};

export default Tabs;
