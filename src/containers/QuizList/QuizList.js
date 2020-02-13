import React, { Component } from 'react';
import classes from './QuizList.module.css';
import { NavLink } from 'react-router-dom';
import Loader from '../../components/UI/Loader/Loader';
import axios from 'axios';

class QuizList extends Component {
  state = {
    quizes: [],
    loading: true
  };

  renderQuizeItem = () => {
    return this.state.quizes.map(quiz => {
      return (
        <li key={quiz.id} className={classes.QuizList_item}>
          <NavLink to={`/quiz/${quiz.id}`} className={classes.QuizList_link}>
            {quiz.name}
          </NavLink>
        </li>
      );
    });
  };

  componentDidMount = async () => {
    try {
      const response = await axios.get(`https://react-quize-e85a5.firebaseio.com/qiuzes.json`);

      const quizes = [];
      Object.keys(response.data).forEach((key, i) => {
        quizes.push({
          id: key,
          name: `Test #${i + 1}`
        });
      });

      this.setState({
        quizes,
        loading: false
      });
    } catch (err) {
      console.log('err: ', err);
    }
  };

  render() {
    return (
      <div className={classes.QuizList}>
        <div>
          <h1 className={classes.QuizList_title}>Quiz List</h1>
          {this.state.loading ? (
            <Loader />
          ) : (
            <ul className={classes.QuizList_list}>{this.renderQuizeItem()}</ul>
          )}
        </div>
      </div>
    );
  }
}

export default QuizList;
