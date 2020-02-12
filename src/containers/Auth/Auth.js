import React, { Component } from 'react';
import classes from './Auth.module.css';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import is from 'is_js';

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
      possword: {
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

  loginHandler = () => {
    console.log('loginHandler');
  };

  registerHandler = () => {
    console.log('registerHandler');
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

  validateControl = (value, validation) => {
    if (!validation) {
      return true;
    }

    let isValid = true;

    if (validation.required) {
      isValid = value.trim() !== `` && isValid;
    }

    if (validation.email) {
      isValid = is.email(value) && isValid;
    }

    if (validation.minLength) {
      isValid = value.length >= 6 && isValid;
    }

    return isValid;
  };

  onChangeHandler = (evt, controlName) => {
    const formControls = { ...this.state.formControls };
    const control = formControls[controlName];

    control.value = evt.target.value;
    control.touched = true;
    control.valid = this.validateControl(control.value, control.validation);

    formControls[controlName] = control;

    let isFormValid = true;

    Object.keys(formControls).forEach(controlName => {
      isFormValid = formControls[controlName].valid && isFormValid;
    });

    this.setState({
      formControls,
      isFormValid
    });
  };

  render() {
    console.log('this.state.isFormValid: ', this.state.isFormValid);
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

export default Auth;
