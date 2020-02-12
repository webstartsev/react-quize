import React, { Component } from 'react';
import classes from './QuizCreator.module.css';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import { createControl, validateControl, validateForm } from '../../form/formFramework';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Select from '../../components/UI/Select/Select';

const createOptionControl = number => {
  return createControl(
    {
      label: `Вариант ${number}`,
      errorMessage: `Значение не может быть пустым`,
      id: number
    },
    {
      required: true
    }
  );
};

const createFromControls = () => {
  return {
    question: createControl(
      {
        label: `Введите вопрос`,
        errorMessage: `Вопрос не может быть пустым`
      },
      {
        required: true
      }
    ),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4)
  };
};

class QuizCreator extends Component {
  state = {
    rightAnswerId: 1,
    quize: [],
    isFormValid: false,
    formControls: createFromControls()
  };

  submitHandler = evt => {
    evt.preventDefault();
  };

  addQuestionHandler = () => {};

  createQuizHandler = () => {};

  onChangeHandler = (value, controlName) => {
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };

    control.touched = true;
    control.value = value;
    control.valid = validateControl(control.value, control.validation);

    formControls[controlName] = control;

    this.setState({
      formControls,
      isFormValid: validateForm(formControls)
    });
  };

  renderControls = () => {
    return Object.keys(this.state.formControls).map((controlName, i) => {
      const control = this.state.formControls[controlName];
      return (
        <Auxiliary key={`${controlName}-${i}`}>
          <Input
            value={control.value}
            valid={control.valid}
            touched={control.touched}
            label={control.label}
            shouldValidate={!!control.validation}
            errorMessage={control.errorMessage}
            onChange={evt => this.onChangeHandler(evt.target.value, controlName)}
          />
          {i === 0 ? <hr /> : null}
        </Auxiliary>
      );
    });
  };

  selectChangeHandler = evt => {
    this.setState({
      rightAnswerId: +evt.target.value
    });
  };

  render() {
    return (
      <div className={classes.QuizCreator}>
        <div className={classes.QuizCreator_wrapper}>
          <h1 className={classes.QuizCreator_title}>Создание текста</h1>

          <form onSubmit={this.submitHandler} className={classes.QuizCreator_form}>
            {this.renderControls()}

            <Select
              label="Выберите правильный ответ"
              value={this.state.rightAnswerId}
              onChange={this.selectChangeHandler}
              options={[
                { text: 1, value: 1 },
                { text: 2, value: 2 },
                { text: 3, value: 3 },
                { text: 4, value: 4 }
              ]}
            />

            <Button
              type="primary"
              onClick={this.addQuestionHandler}
              disabled={!this.state.isFormValid}
            >
              Добавить вопрос
            </Button>
            <Button
              type="success"
              onClick={this.createQuizHandler}
              disabled={!this.state.isFormValid}
            >
              Создать тест
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default QuizCreator;
