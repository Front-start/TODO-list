import React from "react";
import ymaps from "ymaps";

class YouAreHere extends React.Component {
  constructor(props) {
    super(props);
    this.updateInfo = this.updateInfo.bind(this);
    this.buildMap = this.buildMap.bind(this);

    this.state = {
      coordinates: null
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
    ymaps.load("https://api-maps.yandex.ru/2.1/?lang=ru_RU").then(maps => {
      var map = new maps.Map("YMapsID", {
        center: this.state.coordinates,
        zoom: 13
      });

      map.balloon.open(map.getCenter(), {
        contentHeader: "Вы здесь",
        contentBody: "Но это не точно"
      });
    });
  }

  render() {
    return <div id="YMapsID" style={{ width: "500px", height: "400px" }} />;
  }
}

module.exports = YouAreHere;
