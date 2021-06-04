import ArticleList from '../article-list';
import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import { CHANGE_TAB } from '../../constants/actionTypes';
import styled from "styled-components";

const Tab = styled.li`
  padding: 0 24px 12px 24px;
  cursor: pointer;
  ${({ isActive }) => {
    return isActive && ` border-bottom: 3px solid rgba(76, 76, 255, 1);`;
  }}

  & > a {
    color: #f2f2f3;
    font-family: JetBrains Mono;
    font-size: 16px;
    line-height: 24px;
    text-decoration: none;
  }
  & > a:hover {
    text-decoration: none;
  }
`;

const TabList = styled.ul`
  list-style: none;
  display: flex;
  margin: 32px auto 0 auto;
  padding: 0;
  border-bottom: 1px solid rgba(242, 242, 243, 0.4);
`;

const YourFeedTab = props => {
  if (props.token) {
    const clickHandler = ev => {
      ev.preventDefault();
      props.onTabClick('feed', agent.Articles.feed, agent.Articles.feed());
    }

    return (
      <Tab isActive={props.tab === 'feed'}
      onClick={clickHandler}>
        <a  href="">
          Ваша лента
        </a>
      </Tab>
    );
  }
  return null;
};

const GlobalFeedTab = props => {
  const clickHandler = ev => {
    ev.preventDefault();
    props.onTabClick('all', agent.Articles.all, agent.Articles.all());
  };
  return (
    <Tab isActive={props.tab === 'all'}
    onClick={clickHandler}>
      <a
        href="">
        Лента
      </a>
    </Tab>
  );
};

const TagFilterTab = props => {
  if (!props.tag) {
    return null;
  }

  return (
    <Tab isActive={true}>
      <a href="" className="nav-link active">
        <i className="ion-pound"></i> {props.tag}
      </a>
    </Tab>
  );
};

const mapStateToProps = state => ({
  ...state.articleList,
  tags: state.home.tags,
  token: state.common.token
});

const mapDispatchToProps = dispatch => ({
  onTabClick: (tab, pager, payload) => dispatch({ type: CHANGE_TAB, tab, pager, payload })
});

const MainView = props => {
  return (
    <div className="col-md-9 pt-4">
      <div className="feed-toggle">
        <TabList>

          <YourFeedTab
            token={props.token}
            tab={props.tab}
            onTabClick={props.onTabClick} />

          <GlobalFeedTab tab={props.tab} onTabClick={props.onTabClick} />

          <TagFilterTab tag={props.tag} />

        </TabList>
      </div>

      <ArticleList
        pager={props.pager}
        articles={props.articles}
        loading={props.loading}
        articlesCount={props.articlesCount}
        currentPage={props.currentPage} />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
