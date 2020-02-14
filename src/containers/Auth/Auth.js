import React, { Component } from 'react';
import classes from './Auth.module.css';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import { validateControl, validateForm } from '../../form/formFramework';
import { connect } from 'react-redux';
import auth from '../../store/actions/auth';

class Auth extends Component {
  state = {
    isFormValid: false,
    formControls: {
      email: {
        value: ``,
        type: `email`,
        label: `Email`,
        errorMessage: `Введите корректный email`,
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true
        }
      },
      password: {
        value: ``,
        type: `password`,
        label: `Пароль`,
        errorMessage: `Минимальная длина 6 символов`,
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6
        }
      }
    }
  };

  submitHandler = evt => {
    evt.preventDefault();
  };

  loginHandler = async () => {
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      true
    );
  };

  registerHandler = async () => {
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      false
    );
  };

  generationInputs = () => {
    return Object.keys(this.state.formControls).map((controlName, i) => {
      const control = this.state.formControls[controlName];
      return (
        <Input
          key={`${controlName}-${i}`}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          shouldValidate={!!control.validation}
          errorMessage={control.errorMessage}
          onChange={evt => this.onChangeHandler(evt, controlName)}
        />
      );
    });
  };

  onChangeHandler = (evt, controlName) => {
    const formControls = { ...this.state.formControls };
    const control = formControls[controlName];

    control.value = evt.target.value;
    control.touched = true;
    control.valid = validateControl(control.value, control.validation);

    formControls[controlName] = control;

    this.setState({
      formControls,
      isFormValid: validateForm(formControls)
    });
  };

  render() {
    return (
      <div className={classes.Auth}>
        <div className={classes.Auth_wrapper}>
          <h1 className={classes.Auth_title}>Авторизация</h1>

          <form onSubmit={this.submitHandler} className={classes.Auth_form}>
            {this.generationInputs()}

            <Button type="success" onClick={this.loginHandler} disabled={!this.state.isFormValid}>
              Войти
            </Button>
            <Button
              type="primary"
              onClick={this.registerHandler}
              disabled={!this.state.isFormValid}
            >
              Зарегистрироваться
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
  };
};

export default connect(null, mapDispatchToProps)(Auth);
