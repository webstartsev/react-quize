import React from 'react';
import classes from './AnswerList.module.css';
import AnswerItem from './AnswerItem/AnswerItem';

const AnswerList = props => (
  <ul className={classes.AnswerList}>
    {props.answers.map((answer, i) => (
      <AnswerItem key={i} answer={answer} />
    ))}
  </ul>
);

export default AnswerList;
