import ArticlePreview from '../article-preview';
import ListPagination from '../pagination';
import React from 'react';
import {ArticleListContainer} from './style';

const ArticleList = props => {
  if (!props.articles) {
    return (
      <div className="article-preview">Loading...</div>
    );
  }

  if (props.articles.length === 0) {
    return (
      <div className="article-preview">
        Здесь пока нет статей...
      </div>
    );
  }

  return (
    <ArticleListContainer>
      <div className="mb-8">        
        {
          props.articles.map(article => {
            return (
              <ArticlePreview article={article} key={article.slug} />
            );
          })
        }
      </div>

      <ListPagination
        pager={props.pager}
        articlesCount={props.articlesCount}
        currentPage={props.currentPage} />
    </ArticleListContainer>
  );
};

export default ArticleList;
