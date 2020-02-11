import React, { Component } from 'react';
import classes from './Drawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';

const links = [1, 2, 3, 4];

class Drawer extends Component {
  renderLinks = () => {
    return links.map((link, i) => (
      <li className={classes.Drawer_item} key={i}>
        <a href="" className={classes.Drawer_link}>
          {link}
        </a>
      </li>
    ));
  };

  render() {
    const cls = [classes.Drawer];
    if (!this.props.isOpen) {
      cls.push(classes.close);
    }

    return (
      <>
        <nav className={cls.join(` `)}>
          <ul className={classes.Drawer_list}>{this.renderLinks(links)}</ul>
        </nav>
        {this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null}
      </>
    );
  }
}

export default Drawer;
