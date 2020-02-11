import React from 'react';
import classes from './FinishedQuiz.module.css';

const FinishedQuiz = props => {
  return (
    <div className={classes.FinishedQuiz}>
      <ul className={classes.FinishedQuiz_list}>
        <li className={classes.FinishedQuiz_item}>
          <strong>1. </strong> Вопрос?
          <i className={`fa fa-times ${classes.error}`}></i>
        </li>
        <li className={classes.FinishedQuiz_item}>
          <strong>1. </strong> Вопрос?
          <i className={`fa fa-check ${classes.success}`}></i>
        </li>
      </ul>

      <p>Правильно 4 из 10</p>

      <button>Повторить</button>
    </div>
  );
};

export default FinishedQuiz;
