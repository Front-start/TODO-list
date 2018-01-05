import ReactDOM from "react-dom";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import moment from "moment";
moment.locale("ru");
import ymaps from "ymaps";

import Header from "./components/Header.jsx";
import Nav from "./components/Nav.jsx";
import Main from "./components/Main.jsx";
import Item from "./components/Item.jsx";
import NotFound from "./components/NotFound.jsx";

import style from "./styles/style.less";

ymaps.load("https://api-maps.yandex.ru/2.1/?lang=ru_RU").then(maps => {
  maps.geolocation.get().then(result => {
    let location = {
      coordinates: result.geoObjects.get(0).geometry.getCoordinates(),
      name: result.geoObjects.get(0).properties.get("text")
    };
    localStorage.setItem("Location", JSON.stringify(location));
  });
});

localStorage.setItem("PreviousSessionTime", moment().toISOString());

ReactDOM.render(
  <Router>
    <div>
      <Header />
      <Nav />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/item/:id" component={Item} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>,
  document.getElementById("app")
);
