import ReactDOM from "react-dom";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Nav from "./components/Nav.jsx";
import Main from "./components/Main.jsx";
import ItemList from "./components/ItemList.jsx";
import Item from "./components/Item.jsx";
import NotFound from "./components/NotFound.jsx";

import style from "./styles/style.less";

ReactDOM.render(
  <Router>
    <div>
      <Nav />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/item" component={Item} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>,
  document.getElementById("app")
);
