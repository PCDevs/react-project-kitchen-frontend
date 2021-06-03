import React from 'react';
import { Link } from 'react-router-dom';
import agent from '../../agent';
import { connect } from 'react-redux';
import { ARTICLE_FAVORITED, ARTICLE_UNFAVORITED } from '../../constants/actionTypes';
import ArticleMeta from '../article/article-meta';
import Tag from '../tag';
import {ArticlePreviewWrapper, Title, PreviewFooter, ReadMoreLink} from './style';

const FAVORITED_CLASS = 'btn btn-sm btn-primary';
const NOT_FAVORITED_CLASS = 'btn btn-sm btn-outline-primary';

const mapDispatchToProps = dispatch => ({
  favorite: slug => dispatch({
    type: ARTICLE_FAVORITED,
    payload: agent.Articles.favorite(slug)
  }),
  unfavorite: slug => dispatch({
    type: ARTICLE_UNFAVORITED,
    payload: agent.Articles.unfavorite(slug)
  })
});

const ArticlePreview = props => {
  const article = props.article;
  const favoriteButtonClass = article.favorited ?
    FAVORITED_CLASS :
    NOT_FAVORITED_CLASS;

  const handleClick = ev => {
    ev.preventDefault();
    if (article.favorited) {
      props.unfavorite(article.slug);
    } else {
      props.favorite(article.slug);
    }
  };

  return (
    <ArticlePreviewWrapper>
      <ArticleMeta
          style={{paddingBottom: 0}}
          article={article}
          canModify={false} />
      {/* <div className="article-meta">
        <Link to={`/@${article.author.username}`}>
          <img src={article.author.image} alt={article.author.username} />
        </Link>

        <div className="info">
          <Link className="author" to={`/@${article.author.username}`}>
            {article.author.username}
          </Link>
          <span className="date">
            {new Date(article.createdAt).toDateString()}
          </span>
        </div>

        <div className="pull-xs-right">
          <button className={favoriteButtonClass} onClick={handleClick}>
            <i className="ion-heart"></i> {article.favoritesCount}
          </button>
        </div>
      </div> */}

      <Title className="pt-4">{article.title}</Title>
      <p className="text text_color_inactive">{article.description}</p>
      <PreviewFooter className="pb-4">
        <Link to={`/article/${article.slug}`} className="preview-link">
          <ReadMoreLink className="text text_type_main-default">Read more</ReadMoreLink>
        </Link>
        <div>
          {
            article.tagList.map(tag => {
              return (
                <Tag active={true} key={tag} caption={tag} clickable={false} />
              )
            })
          }
        </div>
      </PreviewFooter>
    </ArticlePreviewWrapper>
  );
}

export default connect(() => ({}), mapDispatchToProps)(ArticlePreview);
