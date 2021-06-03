import React from "react";
import Button from "../button";
import styled from "styled-components";

const FollowButton = styled.a`
  padding: 0 16px 0 0;
  align-self: flex-end;
  & > a:hover {
    text-decoration: none;
  }
`;

const FollowUserButton = (props) => {
  if (props.isUser) {
    return null;
  }

  const handleClick = (ev) => {
    ev.preventDefault();
    if (props.user.following) {
      props.unfollow(props.user.username);
    } else {
      props.follow(props.user.username);
    }
  };

  return (
    <FollowButton>
      <Button
        onClick={handleClick}
        caption={`${props.user.following ? " - Отписаться" : " + Подписаться"}`}
        type="submit"
      />
    </FollowButton>
  );
};

export default FollowUserButton;
