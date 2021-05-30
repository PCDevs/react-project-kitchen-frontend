import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ListErrors from "../errors/ListErrors";
import agent from "../../agent";
import { connect } from "react-redux";
import {
  UPDATE_FIELD_AUTH,
  REGISTER,
  REGISTER_PAGE_UNLOADED,
} from "../../constants/actionTypes";

import CustomInput from "../input";
import Button from "../button";
import Link from "../link";

import { RegisterPage, Container, Caption, Form, LinkWrapper } from "./style";

const mapStateToProps = (state) => ({ ...state.auth });

const mapDispatchToProps = (dispatch) => ({
  onChangeEmail: (value) =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: "email", value }),
  onChangePassword: (value) =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: "password", value }),
  onChangeUsername: (value) =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: "username", value }),
  onSubmit: (username, email, password) => {
    const payload = agent.Auth.register(username, email, password);
    dispatch({ type: REGISTER, payload });
  },
  onUnload: () => dispatch({ type: REGISTER_PAGE_UNLOADED }),
});

function Register(props) {
  const { onSubmit, onUnload, errors } = props;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function changeUsername(e) {
    setUsername(e.target.value);
  }

  function changeEmail(e) {
    setEmail(e.target.value);
  }

  function changePassword(e) {
    setPassword(e.target.value);
  }

  function submitForm(username, email, password) {
    return function (e) {
      e.preventDefault();
      onSubmit(username, email, password);
    };
  }

  useEffect(() => {
    return () => {
      onUnload();
    };
  }, []);

  return (
    <RegisterPage>
      <Container>
        <Caption className="text text_type_main-large mt-4 mb-4">
          Зарегистрироваться
        </Caption>
        <LinkWrapper className="mb-5">
          <Link to="/login">Уже есть аккаунт?</Link>
        </LinkWrapper>
        <ListErrors errors={errors} />
        <Form className="mt-1" onSubmit={submitForm(username, email, password)}>
          <CustomInput
            className="mb-6"
            placeholder="Имя пользователя"
            size="default"
            value={username}
            type="text"
            onChange={changeUsername}
          />
          <CustomInput
            className="mb-6"
            placeholder="Email"
            size="default"
            value={email}
            type="email"
            onChange={changeEmail}
          />

          <CustomInput
            className="mb-6"
            placeholder="Пароль"
            size="default"
            value={password}
            type="password"
            onChange={changePassword}
          />

          <div
            style={{ display: "flex", justifyContent: "flex-end" }}
            className="mb-6"
          >
            <Button caption="Зарегистрироваться" type="submit" />
          </div>
        </Form>
      </Container>
    </RegisterPage>
  );
}

Register.propTypes = {
  onSubmit: PropTypes.func,
  onUnload: PropTypes.func,
  errors: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
