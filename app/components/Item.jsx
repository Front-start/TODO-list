import React from "react";
import { Link, BrowserRouter } from "react-router-dom";
import { ItemsStorage } from "./storage.js";
import ItemRender from "./ItemRender.jsx";
import ItemMap from "./ItemMap.jsx";

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.getItemById = this.getItemById.bind(this);
    this.updateInfo = this.updateInfo.bind(this);
    this.getDistance = this.getDistance.bind(this);

    this.state = {
      itemId: null,
      distance: "Неизвестно",
      coordinates1: null,
      coordinates2: null
    };
  }
  getItemById(arr, itemId) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id === +itemId) {
        return i;
      }
    }
  }
  getDistance() {
    ymaps.ready(() => {
      this.setState({
        distance: Math.floor(
          ymaps.coordSystem.geo.getDistance(
            this.state.coordinates1,
            this.state.coordinates2
          ) / 1000
        )
      });
    });
  }

  updateInfo() {
    if (localStorage.getItem("Location")) {
      let id = this.getItemById(ItemsStorage.items, this.props.match.params.id);
      this.setState({
        coordinates1: JSON.parse(localStorage.getItem("Location")).coordinates,
        coordinates2: ItemsStorage.items[id].coordinates,
        itemId: id
      });
      this.getDistance();
    } else setTimeout(this.updateInfo, 100);
  }

  componentWillMount() {
    this.updateInfo();
  }

  render() {
    if (this.state.itemId == undefined) {
      return (
        <div>
          <h2>Нет такой записи</h2>
          <br />
          <Link to={`/`}>Вернуться к списку</Link>
        </div>
      );
    } else {
      return (
        <div>
          {"Расстояние до места назначения: "}
          {this.state.distance}
          {" км"}
          <ItemRender
            item={ItemsStorage.items[this.state.itemId]}
            fields={ItemsStorage.fields}
          />
          <Link to={`/`}>Вернуться к списку</Link>
          <p>Таск находится здесь:</p>
          <ItemMap c1={this.state.coordinates1} c2={this.state.coordinates2} />
        </div>
      );
    }
  }
}

module.exports = Item;
