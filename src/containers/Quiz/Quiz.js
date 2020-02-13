import React, { Component } from 'react';
import classes from './Quiz.module.css';
import ActiveQuize from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import axios from '../../axios/quiz';
import Loader from '../../components/UI/Loader/Loader';

class Quiz extends Component {
  state = {
    loading: true,
    results: {},
    isFinished: false,
    activeQuestion: 0,
    answerState: null,
    quiz: []
  };

  onAnswerClickHandler = answerId => {
    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0];
      if (this.state.answerState[key] === 'success') {
        return;
      }
    }

    const question = this.state.quiz[this.state.activeQuestion];
    const results = this.state.results;

    if (question.rightAnswerId === answerId) {
      if (!results[question.id]) {
        results[question.id] = `success`;
      }

      this.setState({
        answerState: { [answerId]: `success` },
        results
      });

      setTimeout(() => {
        if (this.isQuizeFinished()) {
          this.setState({
            isFinished: true
          });
        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null
          });
        }
      }, 1000);
    } else {
      results[question.id] = `error`;
      this.setState({
        answerState: { [answerId]: `error` },
        results
      });
    }
  };

  isQuizeFinished = () => {
    return this.state.activeQuestion + 1 === this.state.quiz.length;
  };

  retryHandler = () => {
    this.setState({
      results: {},
      isFinished: false,
      activeQuestion: 0,
      answerState: null
    });
  };

  componentDidMount = async () => {
    try {
      const quizeId = this.props.match.params.id;
      const response = await axios.get(`/qiuzes/${quizeId}.json`);

      const quiz = response.data;
      this.setState({
        quiz,
        loading: false
      });
    } catch (err) {
      console.log('err: ', err);
    }
  };

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.quizWrapper}>
          <h1 className={classes.Quiz_title}>Ответьте на все вопросы</h1>

          {this.state.loading ? (
            <Loader />
          ) : this.state.isFinished ? (
            <FinishedQuiz
              onRetry={this.retryHandler}
              results={this.state.results}
              quiz={this.state.quiz}
            />
          ) : (
            <ActiveQuize
              answers={this.state.quiz[this.state.activeQuestion].answers}
              question={this.state.quiz[this.state.activeQuestion].question}
              onAnswerClick={this.onAnswerClickHandler}
              quizeLength={this.state.quiz.length}
              asnwerNumber={this.state.activeQuestion + 1}
              state={this.state.answerState}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Quiz;
