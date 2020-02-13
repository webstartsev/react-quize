import React, { Component } from 'react';
import classes from './QuizList.module.css';
import { NavLink } from 'react-router-dom';
import Loader from '../../components/UI/Loader/Loader';
import { connect } from 'react-redux';
import { fetchQuizes } from '../../store/actions/quiz';

class QuizList extends Component {
  renderQuizeItem = () => {
    return this.props.quizes.map(quiz => {
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
    this.props.fetchQuizes();
  };

  render() {
    return (
      <div className={classes.QuizList}>
        <div>
          <h1 className={classes.QuizList_title}>Quiz List</h1>
          {this.props.loading && this.props.quizes.length !== 0 ? (
            <Loader />
          ) : (
            <ul className={classes.QuizList_list}>{this.renderQuizeItem()}</ul>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    quizes: state.quiz.quizes,
    loading: state.quiz.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchQuizes: () => dispatch(fetchQuizes())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizList);
