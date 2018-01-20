import ReactDOM from "react-dom";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import moment from "moment";
moment.locale("ru");
import ymaps from "ymaps";

import Header from "./components/Header.jsx";
import Nav from "./components/Nav.jsx";
import ItemList from "./components/ItemList.jsx";
import Item from "./components/Item.jsx";
import NotFound from "./components/NotFound.jsx";
import AddItem from "./components/AddItem.jsx";
import { ItemsStorage } from "./components/storage.js";

var redux = require("redux");
import { Provider } from "react-redux";
import reducer from "./components/reducer.jsx";

var store = redux.createStore(reducer);

store.dispatch({
  type: "SET_STATE",
  state: ItemsStorage
});

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

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div className="wrapper">
        <Header />
        <Nav />
        <Switch>
          <Route exact path="/" component={ItemList} />
          <Route path="/additem" component={AddItem} />
          <Route path="/item/:id" component={Item} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  </Provider>,
  document.getElementById("app")
);
