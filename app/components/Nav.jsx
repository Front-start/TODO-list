import React from "react";
import { Link, BrowserRouter } from "react-router-dom";

class Nav extends React.Component {
  render() {
    return (
      <nav>
        <Link to="/">Главная</Link>
        <Link to="/additem">Добавить запись</Link>
      </nav>
    );
  }
}

module.exports = Nav;
