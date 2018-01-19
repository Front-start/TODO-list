import React from "react";
import ymaps from "ymaps";
import { connect } from "react-redux";
import { actions } from "./actions.jsx";

class YouAreHere extends React.Component {
  constructor(props) {
    super(props);
    this.updateInfo = this.updateInfo.bind(this);
    this.buildMap = this.buildMap.bind(this);

    this.state = {
      items: this.props.items
    };
  }

  updateInfo() {
    if (localStorage.getItem("Location")) {
      this.setState({
        coordinates: JSON.parse(localStorage.getItem("Location")).coordinates
      });
      this.buildMap();
    } else setTimeout(this.updateInfo, 100);
  }

  componentDidMount() {
    this.updateInfo();
  }

  buildMap() {
    ymaps
      .load("https://api-maps.yandex.ru/2.1/?lang=ru_RU&load=package.standard")
      .then(maps => {
        var myCollection = new maps.GeoObjectCollection();

        var map = new maps.Map("YMapsID", {
          center: [1, 2],
          zoom: 3
        });

        let location = maps
          .geocode(this.state.coordinates, {
            results: 1
          })
          .then(res => {
            let geoObj = res.geoObjects.get(0);
            geoObj.options.set("preset", "islands#redDotIcon");
            geoObj.properties.set(
              "iconCaption",
              "Вы здесь - " + geoObj.getAddressLine() + "/r/n asd"
            );
            map.geoObjects.add(geoObj);
            map.setBounds(map.geoObjects.getBounds(), {
              checkZoomRange: true,
              zoomMargin: 30
            });
          });

        this.state.items.map(item => {
          let location = maps
            .geocode(item.coordinates, {
              results: 1
            })
            .then(res => {
              let geoObj = res.geoObjects.get(0);
              geoObj.options.set("preset", "islands#violetDotIcon");
              geoObj.properties.set("iconCaption", geoObj.getAddressLine());
              geoObj.events.add("mouseenter", e => {
                this.props.highlight(e.get("target").properties.get("id"));
              });
              geoObj.events.add("mouseleave", e => {
                this.props.highlight(e.get("target").properties.get("id"));
              });
              geoObj.properties.set("id", item.id);
              map.geoObjects.add(geoObj);
              map.setBounds(map.geoObjects.getBounds(), {
                checkZoomRange: true,
                zoomMargin: 30
              });
            });
        });
      });
  }

  render() {
    return <div id="YMapsID" />;
  }
}

function mapStateToProps(state) {
  let obj = state
    .get("items")
    .map(item =>
      item.filter((item, key) => (key == "id" || "coordinates" ? true : false))
    );

  return {
    items: obj.toJS()
  };
}

module.exports = connect(mapStateToProps, actions)(YouAreHere);
