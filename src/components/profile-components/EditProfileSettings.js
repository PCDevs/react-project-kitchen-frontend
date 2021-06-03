import React from "react";
import { Link } from "react-router-dom";
import Button from "../button";
import styled from "styled-components";

const EditButton = styled.div`
  padding: 0 16px 0 0;
  align-self: flex-end;
  & > a:hover {
    text-decoration: none;
  }
`;

const EditProfileSettings = (props) => {
  if (props.isUser) {
    return (
      <EditButton>
        <Link to="/settings">
          <Button caption="Редактировать профиль" />
        </Link>
      </EditButton>
    );
  }
  return null;
};

export default EditProfileSettings;
