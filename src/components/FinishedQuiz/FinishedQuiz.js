import React from 'react';
import classes from './FinishedQuiz.module.css';

const FinishedQuiz = props => {
  const successCount = Object.keys(props.results).reduce((total, key) => {
    if (props.results[key] === `success`) {
      total++;
    }

    return total;
  }, 0);

  return (
    <div className={classes.FinishedQuiz}>
      <ul className={classes.FinishedQuiz_list}>
        {props.quiz.map((quizItem, i) => {
          const cls = [
            `fa`,
            props.results[quizItem.id] === `error` ? `fa-times` : `fa-check`,
            classes[props.results[quizItem.id]]
          ];

          return (
            <li className={classes.FinishedQuiz_item} key={i}>
              <strong>{i + 1}. </strong>&nbsp;{quizItem.question}
              <i className={cls.join(` `)} />
            </li>
          );
        })}
      </ul>

      <p>
        Правильно {successCount} из {props.quiz.length}
      </p>

      <button>Повторить</button>
    </div>
  );
};

export default FinishedQuiz;
