import React from "react";
import { Link, BrowserRouter } from "react-router-dom";

class Nav extends React.Component {
  render() {
    return (
      <div>
        <nav>
          <Link to="/">Главная</Link>
          <Link to="/item">О сайте</Link>
        </nav>
      </div>
    );
  }
}

module.exports = Nav;
