import React, { Component } from 'react';
import classes from './Auth.module.css';
import Button from '../../components/UI/Button/Button';

class Auth extends Component {
  submitHandler = evt => {
    evt.preventDefault();
  };

  loginHandler = () => {
    console.log('loginHandler');
  };

  registerHandler = () => {
    console.log('registerHandler');
  };

  render() {
    return (
      <div className={classes.Auth}>
        <div className={classes.Auth_wrapper}>
          <h1 className={classes.Auth_title}>Авторизация</h1>

          <form onSubmit={this.submitHandler} className={classes.Auth_form}>
            <input type="text" />
            <input type="text" />

            <Button type="success" onClick={this.loginHandler}>
              Войти
            </Button>
            <Button type="primary" onClick={this.registerHandler}>
              Зарегистрироваться
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default Auth;
