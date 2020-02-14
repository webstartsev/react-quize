import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import Quiz from './containers/Quiz/Quiz';
import Auth from './containers/Auth/Auth';
import QuizCreator from './containers/QuizCreator/QuizCreator';
import QuizList from './containers/QuizList/QuizList';
import Logout from './components/Logout/Logout';
import { autoLogin } from './store/actions/auth';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class App extends Component {
  componentDidMount() {
    this.props.autoLogin();
  }

  render() {
    let route = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/quiz/:id" component={Quiz} />
        <Route path="/" exact component={QuizList} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuth) {
      route = (
        <Switch>
          <Route path="/quize-creator" component={QuizCreator} />
          <Route path="/quiz/:id" component={Quiz} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={QuizList} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return <Layout>{route}</Layout>;
  }
}

const mapStateToProps = state => {
  return {
    isAuth: !!state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    autoLogin: () => dispatch(autoLogin())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
