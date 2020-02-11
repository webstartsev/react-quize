import React from 'react';
import classes from './ActiveQuiz.module.css';
import AnswerList from './AnswerList/AnswerList';

const ActiveQuize = props => {
  return (
    <div className={classes.ActiveQuize}>
      <p className={classes.Question}>
        <span>
          <strong>1.</strong>&nbsp; Как дела?
        </span>

        <small>4 из 12</small>
      </p>
      <AnswerList answers={props.answers} />
    </div>
  );
};

export default ActiveQuize;
