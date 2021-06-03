import ArticleList from "../ArticleList";
import React from "react";
import agent from "../../agent";
import { connect } from "react-redux";
import defaultAvatar from "../../images/header/avatar.svg";
import {
  FOLLOW_USER,
  UNFOLLOW_USER,
  PROFILE_PAGE_LOADED,
  PROFILE_PAGE_UNLOADED,
} from "../../constants/actionTypes";
import FollowUserButton from "../profile-components/FollowUserButton";
import renderTabs from "../profile-components/renderTabs";
import EditProfileSettings from "../profile-components/EditProfileSettings";
import { UserInfo, UserArticles, ProfileContainer } from "./styles";

const mapStateToProps = (state) => ({
  ...state.articleList,
  currentUser: state.common.currentUser,
  profile: state.profile,
});

const mapDispatchToProps = (dispatch) => ({
  onFollow: (username) =>
    dispatch({
      type: FOLLOW_USER,
      payload: agent.Profile.follow(username),
    }),
  onLoad: (pager, payload) =>
    dispatch({ type: PROFILE_PAGE_LOADED, pager, payload }),
  onUnfollow: (username) =>
    dispatch({
      type: UNFOLLOW_USER,
      payload: agent.Profile.unfollow(username),
    }),
  onUnload: () => dispatch({ type: PROFILE_PAGE_UNLOADED }),
});

function Profile(props) {
  React.useEffect(() => {
    props.onLoad(
      (page) => agent.Articles.byAuthor(props.match.params.username, page),
      Promise.all([
        agent.Profile.get(props.match.params.username),
        agent.Articles.byAuthor(props.match.params.username),
      ])
    );
    return () => {
      props.onUnload();
    };
  }, [props.match.params.username]);

  const profile = props.profile;
  if (!profile) {
    return null;
  }

  const isUser =
    props.currentUser && props.profile.username === props.currentUser.username;

  return (
    <ProfileContainer>
      <UserInfo>
        <img
          src={
            profile.image ===
            "https://static.productionready.io/images/smiley-cyrus.jpg"
              ? defaultAvatar
              : profile.image
          }
          alt={profile.username}
        />
        <h4>{profile.username}</h4>
        <p>{profile.bio}</p>
        <EditProfileSettings isUser={isUser} />
        <FollowUserButton
          isUser={isUser}
          user={profile}
          follow={props.onFollow}
          unfollow={props.onUnfollow}
        />
      </UserInfo>
      <UserArticles>
        {renderTabs(props)}
        <ArticleList
          pager={props.pager}
          articles={props.articles}
          articlesCount={props.articlesCount}
          state={props.currentPage}
          currentPage={props.currentPage}
        />
      </UserArticles>
    </ProfileContainer>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
