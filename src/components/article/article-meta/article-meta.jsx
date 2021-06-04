import React from 'react';
import PropTypes from 'prop-types';
import ArticleActions from '../article-actions';
import {ArticleMetaWrapper} from './style';
import UserInfo from '../../user-info';

const ArticleMeta = ({article, canModify, underline, style}) => {
  const {author, createdAt} = article;
  const {image, username} = author;
  return (
    <ArticleMetaWrapper className="pt-8 pb-8" style={style} underline={underline}>
      <UserInfo username={username} image={image} createdAt={createdAt}/>
      <ArticleActions canModify={canModify} article={article} />
    </ArticleMetaWrapper>
  );
};

ArticleMeta.propTypes = {
  canModify: PropTypes.bool,
  article: PropTypes.shape({
    author: PropTypes.shape({
      following: PropTypes.bool,
      image: PropTypes.string,
      username: PropTypes.string
    }),
    body: PropTypes.string,
    createdAt: PropTypes.string,
    description: PropTypes.string,
    favorited: PropTypes.bool,
    favoritesCount: PropTypes.number,
    image: PropTypes.any,
    slug: PropTypes.string,
    tagList: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string,
    updatedAt: PropTypes.string
  }),
  underline: PropTypes.bool,
  style: PropTypes.any
};

export default ArticleMeta;
