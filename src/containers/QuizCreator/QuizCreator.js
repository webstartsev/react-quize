import React, { Component } from 'react';
import classes from './QuizCreator.module.css';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import { createControl, validateControl, validateForm } from '../../form/formFramework';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Select from '../../components/UI/Select/Select';
import { connect } from 'react-redux';
import { finishCreateQuiz, createQuizQuestion } from '../../store/actions/create';

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
    isFormValid: false,
    formControls: createFromControls()
  };

  submitHandler = evt => {
    evt.preventDefault();
  };

  addQuestionHandler = () => {
    const { question, option1, option2, option3, option4 } = this.state.formControls;

    const questionItem = {
      question: question.value,
      id: this.props.quiz.length + 1,
      rightAnswerId: this.state.rightAnswerId,
      answers: [
        { text: option1.value, id: option1.id },
        { text: option2.value, id: option2.id },
        { text: option3.value, id: option3.id },
        { text: option4.value, id: option4.id }
      ]
    };
    this.props.createQuizQuestion(questionItem);

    this.setState({
      rightAnswerId: 1,
      isFormValid: false,
      formControls: createFromControls()
    });
  };

  createQuizHandler = () => {
    this.setState({
      rightAnswerId: 1,
      isFormValid: false,
      formControls: createFromControls()
    });

    this.props.finishCreateQuiz();
  };

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
              disabled={this.props.quiz.length === 0}
            >
              Создать тест
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    quiz: state.create.quiz
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createQuizQuestion: item => dispatch(createQuizQuestion(item)),
    finishCreateQuiz: () => dispatch(finishCreateQuiz())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator);
