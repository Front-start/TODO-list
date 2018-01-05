import React from "react";

class YouAreHere extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    ymaps.ready(() => {
      ymaps.geolocation.get({ mapStateAutoApply: true }).then(result => {
        var $container = $("YMapsID"),
          bounds = result.geoObjects.get(0).properties.get("boundedBy"),
          mapState = ymaps.util.bounds.getCenterAndZoom(bounds, [
            $container.width(),
            $container.height()
          ]);

        mapState.zoom = 12;
        var map = new ymaps.Map("YMapsID", mapState);

        map.balloon.open(map.getCenter(), {
          contentHeader: "Вы здесь",
          contentBody: "Но это не точно"
        });
      });
    });
  }

  render() {
    return <div id="YMapsID" style={{ width: "500px", height: "400px" }} />;
  }
}

module.exports = YouAreHere;
