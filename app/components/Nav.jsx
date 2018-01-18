import React from "react";
import { Link, BrowserRouter } from "react-router-dom";

class Nav extends React.Component {
  render() {
    return (
      <nav>
        <Link to="/">Главная</Link>
        <Link to="/redux">Redux</Link>
      </nav>
    );
  }
}

module.exports = Nav;
