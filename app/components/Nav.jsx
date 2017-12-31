import React from "react";
import { Link, BrowserRouter } from "react-router-dom";

class Nav extends React.Component {
  render() {
    return (
      <div>
        <div>
          <h1>Super_*TODO_list*_V.i.P</h1>
        </div>
        <nav>
          <Link to="/">Главная</Link>
          <Link to="/item">О сайте</Link>
        </nav>
      </div>
    );
  }
}

module.exports = Nav;
