import agent from "../agent";
import React from "react";
import { connect } from "react-redux";
import { APP_LOAD, REDIRECT } from "../constants/actionTypes";
import { Route, Switch } from "react-router-dom";
import Article from "../components/article";
import Editor from "../components/editor";
import Home from "../components/Home";
import Login from "../components/login";
import { Profile, ProfileFavorites } from "../components/profile";
import Register from "../components/register";
import Settings from "../components/settings";
import { store } from "../store";
import { push } from "react-router-redux";
import Header from "../components/header";
import GlobalFonts from "../fonts";

const mapStateToProps = (state) => {
  return {
    appLoaded: state.common.appLoaded,
    appName: state.common.appName,
    currentUser: state.common.currentUser,
    redirectTo: state.common.redirectTo,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onLoad: (payload, token) =>
    dispatch({ type: APP_LOAD, payload, token, skipTracking: true }),
  onRedirect: () => dispatch({ type: REDIRECT }),
});

class App extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      // this.context.router.replace(nextProps.redirectTo);
      store.dispatch(push(nextProps.redirectTo));
      this.props.onRedirect();
    }
  }

  componentWillMount() {
    const token = window.localStorage.getItem("jwt");
    if (token) {
      agent.setToken(token);
    }

    this.props.onLoad(token ? agent.Auth.current() : null, token);
  }

  render() {
    if (this.props.appLoaded) {
      return (
        <div>
          <GlobalFonts />
          <Header
            appName={this.props.appName}
            currentUser={this.props.currentUser}
          />
          <div style={{paddingTop: 60}}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/editor/:slug" component={Editor} />
              <Route path="/editor" component={Editor} />
              <Route path="/article/:id" component={Article} />
              <Route path="/settings" component={Settings} />
              <Route path="/@:username/favorites" component={ProfileFavorites} />
              <Route path="/@:username" component={Profile} />
            </Switch>
          </div>
        </div>
      );
    }
    return (
      <div>
        <Header
          appName={this.props.appName}
          currentUser={this.props.currentUser}
        />
      </div>
    );
  }
}

// App.contextTypes = {
//   router: PropTypes.object.isRequired
// };

export default connect(mapStateToProps, mapDispatchToProps)(App);
