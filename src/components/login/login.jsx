import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types';
import ListErrors from '../ListErrors';
import agent from '../../agent';
import { connect } from 'react-redux';
import {
  LOGIN,
  LOGIN_PAGE_UNLOADED
} from '../../constants/actionTypes';
import CustomInput from '../input';
import Button from '../button';
import Link from '../link';
import {LoginPage, Container, Caption, Form, LinkWrapper} from './style';

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  onSubmit: (email, password) =>
    dispatch({ type: LOGIN, payload: agent.Auth.login(email, password) }),
  onUnload: () =>
    dispatch({ type: LOGIN_PAGE_UNLOADED })
});

function Login(props) {
  const {onSubmit, onUnload, errors} = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function changeEmail(ev) {
    setEmail(ev.target.value);
  }

  function changePassword(ev) {
    setPassword(ev.target.value);
  }
  
  function submitForm(email, password) {
    return function(ev) {
      ev.preventDefault();
      onSubmit(email, password);
    }
  }

  useEffect(() => {
    return () => {
      onUnload();
    }
  }, []);  
  
  return (
    <LoginPage>
      <Container>
        
        <Caption className="text text_type_main-large mt-4 mb-4">Войти</Caption>
        <LinkWrapper className="mb-5">
          <Link to="/register">
            Хотите создать аккаунт?
          </Link>        
        </LinkWrapper>
        <ListErrors errors={errors} />
        <Form className="mt-1" onSubmit={submitForm(email, password)}>

          <CustomInput
            className="mb-6"
            placeholder="Email"
            size="default"
            value={email}
            type="email"
            onChange={changeEmail} />

          <CustomInput
            className="mb-6"
            placeholder="Пароль"
            size="default"
            value={password}
            type="password"
            onChange={changePassword} />

          <div style={{display: 'flex', justifyContent: 'flex-end'}}              
            className="mb-6">
            <Button
              caption="Войти"
              type="submit"
            />
          </div>
        </Form>
      </Container>
    </LoginPage>
  );
}

Login.propTypes = {
  onSubmit: PropTypes.func,
  onUnload: PropTypes.func,
  errors: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
