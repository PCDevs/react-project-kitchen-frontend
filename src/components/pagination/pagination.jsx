import React from "react";
import agent from "../../agent";
import { connect } from "react-redux";
import { SET_PAGE } from "../../constants/actionTypes";
import { Pagination, PaginationItem } from "./style";

const mapDispatchToProps = (dispatch) => ({
  onSetPage: (page, payload) => dispatch({ type: SET_PAGE, page, payload }),
});

const ListPagination = (props) => {
  if (props.articlesCount <= 10) {
    return null;
  }

  const range = [];
  for (let i = 0; i < Math.ceil(props.articlesCount / 10); ++i) {
    range.push(i);
  }

  const setPage = (page) => {
    if (props.pager) {
      props.onSetPage(page, props.pager(page));
    } else {
      props.onSetPage(page, agent.Articles.all(page));
    }
  };

  return (
    <nav>
      <Pagination>
        {range.map((v) => {
          console.log(v);
          console.log(range.length);
          const isCurrent = v === props.currentPage;
          const onClick = (ev) => {
            ev.preventDefault();
            setPage(v);
          };
          return (
            range.length < 5 && (
              <PaginationItem
                isFirst={v === 0}
                isLast={v === range.length - 1}
                isActive={isCurrent}
                onClick={onClick}
                key={v.toString()}
              >
                <a href="">{v + 1}</a>
              </PaginationItem>
            )
          );
        })}
      </Pagination>
    </nav>
  );
};

export default connect(() => ({}), mapDispatchToProps)(ListPagination);
