import React from 'react';
import classes from './ActiveQuiz.module.css';
import AnswerList from './AnswerList/AnswerList';

const ActiveQuize = props => {
  return (
    <div className={classes.ActiveQuize}>
      <p className={classes.Question}>
        <span>
          <strong>{props.asnwerNumber}.</strong>&nbsp; {props.question}
        </span>

        <small>
          {props.asnwerNumber} из {props.quizeLength}
        </small>
      </p>
      <AnswerList answers={props.answers} onAnswerClick={props.onAnswerClick} state={props.state} />
    </div>
  );
};

export default ActiveQuize;
