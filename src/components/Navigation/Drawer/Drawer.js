import React, { Component } from 'react';
import classes from './Drawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

class Drawer extends Component {
  clickHandler = () => {
    this.props.onClose();
  };

  renderLinks = links => {
    return links.map((link, i) => (
      <li className={classes.Drawer_item} key={i}>
        <NavLink
          to={link.to}
          exact={link.exact}
          className={classes.Drawer_link}
          activeClassName={classes.active}
          onClick={this.clickHandler}
        >
          {link.label}
        </NavLink>
      </li>
    ));
  };

  render() {
    const cls = [classes.Drawer];
    if (!this.props.isOpen) {
      cls.push(classes.close);
    }

    const links = [{ to: `/`, label: `Список`, exact: true }];

    if (this.props.isAuth) {
      links.push({ to: `/quize-creator`, label: `Создать тест`, exact: false });
      links.push({ to: `/logout`, label: `Выйти`, exact: false });
    } else {
      links.push({ to: `/auth`, label: `Авторизация`, exact: false });
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

const mapStateToProps = state => {
  return {
    isAuth: !!state.auth.token
  };
};

export default connect(mapStateToProps)(Drawer);
