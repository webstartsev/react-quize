import React, { Component } from 'react';
import classes from './QuizList.module.css';
import { NavLink } from 'react-router-dom';

class QuizList extends Component {
  renderQuizeItem = () => {
    return [1, 2, 3].map((item, i) => {
      return (
        <li key={i} className={classes.QuizList_item}>
          <NavLink to={`/quiz/${item}`} className={classes.QuizList_link}>
            Test {item}
          </NavLink>
        </li>
      );
    });
  };

  render() {
    return (
      <div className={classes.QuizList}>
        <div>
          <h1 className={classes.QuizList_title}>Quiz List</h1>

          <ul className={classes.QuizList_list}>{this.renderQuizeItem()}</ul>
        </div>
      </div>
    );
  }
}

export default QuizList;
