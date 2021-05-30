import ListErrors from '../errors/ListErrors';
import React, { useState } from 'react';
import PropTypes, { bool } from 'prop-types';
import agent from '../../agent';
import { connect } from 'react-redux';
import {
  SETTINGS_SAVED,
  SETTINGS_PAGE_UNLOADED,
  LOGOUT
} from '../../constants/actionTypes';

import {
  Container,
  SettingsPage,
  Caption,
  Form
} from './style';
import Button from '../button';
import CustomInput from '../input';

function SettingsForm({
  currentUser,
  onSubmitForm,
  onClickLogout,
  // inProgress
}) {
  const [image, setImage] = useState(currentUser ? currentUser.image : '');
  const [username, setUsername] = useState(currentUser ? currentUser.username : '');
  const [bio, setBio] = useState(currentUser ? currentUser.bio : '');
  const [email, setEmail] = useState(currentUser ? currentUser.email : '');
  const [password, setPassword] = useState('');

  const changeImage = function(ev) {
    setImage(ev.target.value);
  };

  const changeUsername = function(ev) {
    setUsername(ev.target.value);
  };

  const changeBio = function(ev) {
    setBio(ev.target.value);
  };

  const changeEmail = function(ev) {
    setEmail(ev.target.value);
  };

  const changePassword = function(ev) {
    setPassword(ev.target.value);
  };

  const submitForm = ev => {
    ev.preventDefault();
    onSubmitForm({
      image,
      username,
      bio,
      email,
      password
    });
  };

  return (
    <Form onSubmit={submitForm}>

      <CustomInput              
        className="mb-6"
        placeholder="URL аватара профиля"
        size="default"
        value={image}
        onChange={changeImage} />

      <CustomInput              
        className="mb-6"
        placeholder="Логин"
        size="default"
        value={username}
        onChange={changeUsername} />

      <CustomInput              
        className="mb-6"
        placeholder="О себе"
        size="default"
        value={bio}
        onChange={changeBio} />

      <CustomInput              
        className="mb-6"
        placeholder="e-mail"
        size="default"
        value={email}
        onChange={changeEmail} />

      <CustomInput
        className="mb-6"
        placeholder="Пароль"
        size="default"
        value={password}
        type="password"
        onChange={changePassword} />

      <div
        style={{ display: "flex", justifyContent: "space-between" }}
        className="mb-6"
      >
        <Button caption="Выйти из аккаунта" onClick={onClickLogout} />
        <Button caption="Сохранить" type="submit" />
      </div>
      
    </Form>
  );
}

SettingsForm.propTypes = {
  currentUser: PropTypes.shape({
    image: PropTypes.string,
    username: PropTypes.string,
    bio: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
  }),
  onSubmitForm: PropTypes.func,
  inProgress: bool,
  onClickLogout: PropTypes.func
};

const mapStateToProps = state => ({
  ...state.settings,
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  onClickLogout: () => dispatch({ type: LOGOUT }),
  onSubmitForm: user =>
    dispatch({ type: SETTINGS_SAVED, payload: agent.Auth.save(user) }),
  onUnload: () => dispatch({ type: SETTINGS_PAGE_UNLOADED })
});

function Settings({
  errors,
  currentUser,
  onSubmitForm,
  onClickLogout
}) {

  return (
    <SettingsPage>
      <Container>
        <Caption className="text text_type_main-large mt-4 mb-4">Настройки</Caption>

        <ListErrors errors={errors}></ListErrors>

        <SettingsForm
          currentUser={currentUser}
          onSubmitForm={onSubmitForm}
          onClickLogout={onClickLogout} />
      </Container>
    </SettingsPage>
  );
}

Settings.propTypes = {
  errors: PropTypes.object,
  currentUser: PropTypes.object,
  onSubmitForm: PropTypes.func,
  onClickLogout: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
