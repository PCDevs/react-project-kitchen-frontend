import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import ArticleMeta from './article-meta';
import CommentContainer from './comment-container';
import agent from '../../agent';
import { connect } from 'react-redux';
import marked from 'marked';
import { ARTICLE_PAGE_LOADED, ARTICLE_PAGE_UNLOADED } from '../../constants/actionTypes';
import {ArticlePage, Container, Title, ArticleBody} from './style';
import Image from '../image';
import Tag from '../tag';

const mapStateToProps = state => ({
  ...state.article,
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload =>
    dispatch({ type: ARTICLE_PAGE_LOADED, payload }),
  onUnload: () =>
    dispatch({ type: ARTICLE_PAGE_UNLOADED })
});

function Article({
  onLoad,
  onUnload,
  match,
  article,
  currentUser,
  comments,
  commentErrors
}) {
  
  useEffect(() => {
    
    !article && onLoad(Promise.all([
      agent.Articles.get(match.params.id),
      agent.Comments.forArticle(match.params.id)
    ]));

    return () => {
      onUnload();
    };
  }, []);

  if (!article) {
    return null;
  }

  const markup = { __html: marked(article.body, { sanitize: true }) };
  const canModify = currentUser &&
    currentUser.username === article.author.username;
  return (
    <ArticlePage>
      
      <Container>
        <ArticleMeta
          underline
          article={article}
          canModify={canModify} />
        <Title className="text text_type_main-large mt-4 mb-4">{article.title}</Title>
      </Container>
      
      

      <Container>
        {article.image && <Image img={article.image} />}
        <ArticleBody className="text text_type_main-default" dangerouslySetInnerHTML={markup}></ArticleBody>
        {article.tagList.length > 0 && <div style={{display: 'flex', justifyContent: 'flex-start'}}              
          className="mb-6">
          {
            (article.tagList || []).map(tag => {
              return (
                <Tag active={true} key={tag} caption={tag} clickable={false} />
            );
            })
          }
        </div>}

        <div className="row mb-8" style={{width: '100%'}}>
          <CommentContainer
            comments={comments || []}
            errors={commentErrors}
            slug={match.params.id}
            currentUser={currentUser} />
        </div>
      </Container>
    </ArticlePage>
  );
}

Article.propTypes = {
  onLoad: PropTypes.func,
  onUnload: PropTypes.func,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  }),
  article: ArticleMeta.propTypes.article,
  currentUser: PropTypes.object,
  comments: CommentContainer.propTypes.comments,
  commentErrors: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(Article);
