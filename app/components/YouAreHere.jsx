import React from "react";

class YouAreHere extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    ymaps.ready(() => {
      var map = new ymaps.Map("YMapsID", {
        center: JSON.parse(localStorage.getItem("Location")).coordinates,
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
