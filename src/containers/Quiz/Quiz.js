import React, { Component } from 'react';
import classes from './Quiz.module.css';
import ActiveQuize from '../../components/ActiveQuiz/ActiveQuiz';

class Quiz extends Component {
  state = {
    activeQuestion: 0,
    quiz: [
      {
        id: 1,
        question: `Какого цвета небо?`,
        rightAnswerId: 2,
        answers: [
          { text: `Черный`, id: 1 },
          { text: `Синий`, id: 2 },
          { text: `Красный`, id: 3 },
          { text: `Зеленый`, id: 4 }
        ]
      },
      {
        id: 2,
        question: `В каком году основа Санкт-Петербург`,
        rightAnswerId: 3,
        answers: [
          { text: `1700`, id: 1 },
          { text: `1705`, id: 2 },
          { text: `1703`, id: 3 },
          { text: `1803`, id: 4 }
        ]
      }
    ]
  };

  onAnswerClickHandler = answerId => {
    console.log('answerId: ', answerId);

    this.setState({
      activeQuestion: this.state.activeQuestion + 1
    });
  };

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.quizWrapper}>
          <h1 className={classes.Quiz_title}>Ответьте на все вопросы</h1>
          <ActiveQuize
            answers={this.state.quiz[this.state.activeQuestion].answers}
            question={this.state.quiz[this.state.activeQuestion].question}
            onAnswerClick={this.onAnswerClickHandler}
            quizeLength={this.state.quiz.length}
            asnwerNumber={this.state.activeQuestion + 1}
          />
        </div>
      </div>
    );
  }
}

export default Quiz;
