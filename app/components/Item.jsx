import React from "react";
import { Link, BrowserRouter } from "react-router-dom";
import { ItemsStorage } from "./storage.js";
import ItemRender from "./ItemRender.jsx";

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.getItemById = this.getItemById.bind(this);

    this.state = {
      itemId: null,
      coordinate1: null,
      coordinate2: null,
      distance: "Неизвестно"
    };
  }
  getItemById(arr, itemId) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id === +itemId) {
        return i;
      }
    }
  }
  componentWillMount() {
    let id = this.getItemById(ItemsStorage.items, this.props.match.params.id);
    this.setState({
      coordinate1: localStorage.getItem("Location").split(","),
      coordinate2: ItemsStorage.items[id].coordinates,
      itemId: id
    });
  }
  componentDidMount() {
    ymaps.ready(() => {
      this.setState({
        distance: Math.floor(
          ymaps.coordSystem.geo.getDistance(
            this.state.coordinate1,
            this.state.coordinate2
          ) / 1000
        )
      });

      var myGeoObjects = new ymaps.GeoObjectCollection(
        {},
        {
          strokeWidth: 4,
          geodesic: true
        }
      );

      let myMap = new ymaps.Map("item-map", {
        center: [1, 2],
        zoom: 5
      });

      myGeoObjects.add(
        new ymaps.Polyline([this.state.coordinate1, this.state.coordinate2])
      );

      var firstLocation = ymaps
        .geocode(this.state.coordinate1, {
          results: 1
        })
        .then(function(res) {
          let firstGeoObject = res.geoObjects.get(0),
            coords = firstGeoObject.geometry.getCoordinates(),
            bounds = firstGeoObject.properties.get("boundedBy");

          firstGeoObject.options.set(
            "preset",
            "islands#darkBlueDotIconWithCaption"
          );
          firstGeoObject.properties.set(
            "iconCaption",
            firstGeoObject.getAddressLine()
          );
          myGeoObjects.add(firstGeoObject);
        });

      var secondLocation = ymaps
        .geocode(this.state.coordinate2, {
          results: 1
        })
        .then(function(res) {
          let secondGeoObject = res.geoObjects.get(0),
            coords = secondGeoObject.geometry.getCoordinates(),
            bounds = secondGeoObject.properties.get("boundedBy");

          secondGeoObject.options.set(
            "preset",
            "islands#darkBlueDotIconWithCaption"
          );
          secondGeoObject.properties.set(
            "iconCaption",
            secondGeoObject.getAddressLine()
          );

          myGeoObjects.add(secondGeoObject);
          myMap.geoObjects.add(myGeoObjects);

          myMap.setBounds(myGeoObjects.getBounds(), {
            checkZoomRange: true,
            zoomMargin: 30
          });
        });
    });
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
          <div id="item-map" style={{ width: "500px", height: "400px" }} />
        </div>
      );
    }
  }
}

module.exports = Item;
