import React from "react";
import { Link, BrowserRouter } from "react-router-dom";
import ItemRender from "./ItemRender.jsx";
import ItemMap from "./ItemMap.jsx";
import ymaps from "ymaps";

import { connect } from "react-redux";
import actions from "./actions.jsx";

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.getItemById = this.getItemById.bind(this);
    this.updateInfo = this.updateInfo.bind(this);

    this.state = {
      itemId: null,
      distance: "Неизвестно",
      coordinates1: null,
      coordinates2: null
    };
  }
  getItemById(arr, itemId) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id == +itemId) {
        return i;
      }
    }
  }

  updateInfo() {
    if (localStorage.getItem("Location") && this.state.itemId != null) {
      this.setState({
        coordinates1: JSON.parse(localStorage.getItem("Location")).coordinates,
        coordinates2: this.props.items[this.state.itemId].coordinates
      });
      ymaps.load("https://api-maps.yandex.ru/2.1/?lang=ru_RU").then(maps => {
        this.setState({
          distance: Math.floor(
            maps.coordSystem.geo.getDistance(
              this.state.coordinates1,
              this.state.coordinates2
            ) / 1000
          )
        });
      });
    } else setTimeout(this.updateInfo, 100);
  }

  componentWillMount() {
    let id = this.getItemById(this.props.items, this.props.match.params.id);
    if (id != undefined) {
      this.setState({
        itemId: id
      });
      this.updateInfo();
    }
  }

  render() {
    if (this.state.itemId == undefined && this.state.coordinates1 == null) {
      return (
        <div>
          <h2>Нет такой записи</h2>
          <br />
          <Link to={`/`}>Вернуться к списку</Link>
        </div>
      );
    } else {
      return (
        <div className="item item-single">
          <div style={{ padding: "15px" }}>
            <Link to={`/`}>Вернуться к списку</Link>
          </div>

          <ItemRender
            item={this.props.items[this.state.itemId]}
            fields={this.props.fields}
          />

          <h2>Таск находится здесь:</h2>
          <div style={{ padding: "15px" }}>
            {"Расстояние до места назначения: "}
            {this.state.distance}
            {" км"}
          </div>
          <ItemMap c1={this.state.coordinates1} c2={this.state.coordinates2} />
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  let obj = state.get("items").toJS();
  let obj2 = state.get("fields").toJS();

  obj.map(item => {
    Object.defineProperty(item, "state", { enumerable: false });
    Object.defineProperty(item, "coordinates", { enumerable: false });
  });

  return {
    fields: obj2,
    items: obj
  };
}

module.exports = connect(mapStateToProps, actions)(Item);
