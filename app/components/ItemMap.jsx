import React from "react";

class ItemMap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      coordinate1: this.props.c1,
      coordinate2: this.props.c2
    };
  }
  componentWillMount() {
    ymaps.ready(() => {
      var myGeoObjects = new ymaps.GeoObjectCollection(
        {},
        {
          strokeWidth: 4,
          geodesic: true
        }
      );

      myGeoObjects.add(
        new ymaps.Polyline([this.state.coordinate1, this.state.coordinate2])
      );

      var firstLocation = ymaps
        .geocode(this.state.coordinate1, {
          results: 1
        })
        .then(function(res) {
          let firstGeoObject = res.geoObjects.get(0);
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
          let secondGeoObject = res.geoObjects.get(0);
          secondGeoObject.options.set(
            "preset",
            "islands#darkBlueDotIconWithCaption"
          );
          secondGeoObject.properties.set(
            "iconCaption",
            secondGeoObject.getAddressLine()
          );
          myGeoObjects.add(secondGeoObject);

          let myMap = new ymaps.Map("item-map", {
            center: [1, 2],
            zoom: 5
          });

          myMap.geoObjects.add(myGeoObjects);

          myMap.setBounds(myGeoObjects.getBounds(), {
            checkZoomRange: true,
            zoomMargin: 30
          });
        });
    });
  }

  render() {
    return <div id="item-map" style={{ width: "500px", height: "400px" }} />;
  }
}

module.exports = ItemMap;
