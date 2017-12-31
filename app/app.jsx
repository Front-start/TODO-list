import ReactDOM from "react-dom";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ItemsList from "./components/ItemsList.jsx";

import style from "./styles/style.less";

const asd = `asdfsfda`;

ReactDOM.render(
  <div>
    <ItemsList />
    <img src="./images/u4.jpg" />
  </div>,
  document.getElementById("app")
);
