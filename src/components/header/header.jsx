import React from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import {
  HeaderNavbar,
  HeaderContainer,
  HeaderLink,
  HeaderLinks,
  Logo,
} from "./style";

import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import homeIcon from "../../images/header/home.svg";
import homeIconActive from "../../images/header/home_active.svg";
import logoutIcon from "../../images/header/logout.svg";
import loginIcon from "../../images/header/login.svg";
import loginIconActive from "../../images/header/login_active.svg";
import postIcon from "../../images/header/post.svg";
import postIconActive from "../../images/header/post_active.svg";
import settingsIcon from "../../images/header/settings.svg";
import settingsIconActive from "../../images/header/settings_active.svg";
import avatar from "../../images/header/avatar.svg";

import {
  LOGOUT
} from '../../constants/actionTypes';

const mapDispatchToProps = dispatch => ({
  onClickLogout: () => dispatch({ type: LOGOUT }),  
});

const LoggedOutView = (props) => {
  if (!props.currentUser) {
    return (
      <HeaderLinks>
        <HeaderLink isActive={props.location === "/"}>
          <img
            src={props.location === "/" ? homeIconActive : homeIcon}
            alt="главная"
          />
          <Link to="/"> Главная</Link>
        </HeaderLink>

        <HeaderLink
          isActive={
            props.location === "/login"
          }
        >
          <img
            src={
              props.location === "/login"
                ? loginIconActive
                : loginIcon
            }
            alt="signin"
          />
          <Link to="/login">Войти</Link>
        </HeaderLink>
        <HeaderLink
          isActive={
            props.location === "/register"
          }
        >
          <img
            src={
              props.location === "/register"
              ? postIconActive : postIcon
            }
            alt="signup"
          />
          <Link to="/register">Регистрация</Link>
        </HeaderLink>
      </HeaderLinks>
    );
  }
  return null;
};

LoggedOutView.propTypes = {
  location: PropTypes.string,
  currentUser: PropTypes.object,
};

const LoggedInView = (props) => {
  if (props.currentUser) {
    return (
      <HeaderLinks>
        <HeaderLink isActive={props.location === "/"}>
          <img
            src={props.location === "/" ? homeIconActive : homeIcon}
            alt="главная"
          />
          <Link to="/"> Главная</Link>
        </HeaderLink>

        <HeaderLink isActive={props.location === "/editor"}>
          <img
            src={props.location === "/editor" ? postIconActive : postIcon}
            alt="новая запись"
          />
          <Link to="/editor"> Новая запись</Link>
        </HeaderLink>

        <HeaderLink isActive={props.location === "/settings"}>
          <img
            src={
              props.location === "/settings" ? settingsIconActive : settingsIcon
            }
            alt="настройки"
          />
          <Link to="/settings"> Настройки </Link>
        </HeaderLink>

        <HeaderLink
          isActive={props.location === `/@${props.currentUser.username}`}
        >
          {/* TODO: сюда помещать аватарку, которую выбрал пользователь из списка, когда добавим эту функцию в личный кабинет*/}
          <img src={avatar} alt="аватар" />
          <Link to={`/@${props.currentUser.username}`} style={{textTransform: 'capitalize'}}>
            {" "}
            {props.currentUser.username}{" "}
          </Link>
        </HeaderLink>
        <HeaderLink isActive={false}>
          <img
            src={logoutIcon}
            alt="Выйти"
          />
          <Link onClick={props.onClickLogout}> Выйти </Link>
        </HeaderLink>
      </HeaderLinks>
    );
  }

  return null;
};

LoggedInView.propTypes = {
  location: PropTypes.string,
  currentUser: PropTypes.object,
  onClickLogout: PropTypes.func
};

function Header(props) {
  let location = useLocation().pathname;
  return (
    <HeaderNavbar className="text text_type_main-default">
      <HeaderContainer>        
        <Logo>
          <a href="/">
            Алкостопом по галактике
          </a>
        </Logo>        

        <LoggedOutView
          location={location}
          currentUser={props.currentUser} />
        <LoggedInView
          location={location}
          currentUser={props.currentUser}
          onClickLogout={props.onClickLogout}/>
      </HeaderContainer>
    </HeaderNavbar>
  );
}

Header.propTypes = {
  currentUser: PropTypes.object,
  onClickLogout: PropTypes.func
};

export default connect(null, mapDispatchToProps)(Header);
