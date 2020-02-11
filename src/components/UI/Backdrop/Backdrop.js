import React from 'react';
import classes from './Backdrop.module.css';

const Backdrop = props => <div class={classes.Backdrop} onClick={props.onClick} />;

export default Backdrop;
