import React from "react";
import ymaps from "ymaps";

class ItemMap extends React.Component {
  constructor(props) {
    super(props);

    this.buildMap = this.buildMap.bind(this);

    this.state = {
      coordinate1: this.props.c1,
      coordinate2: this.props.c2
    };
  }
  buildMap() {
    this.setState({
      coordinate1: this.props.c1,
      coordinate2: this.props.c2
    });
    if (this.state.coordinate1 && this.state.coordinate2) {
      ymaps
        .load(
          "https://api-maps.yandex.ru/2.1/?lang=ru_RU&width=100%&height=100%"
        )
        .then(maps => {
          var myGeoObjects = new maps.GeoObjectCollection(
            {},
            {
              strokeWidth: 4,
              geodesic: true
            }
          );

          myGeoObjects.add(
            new maps.Polyline([this.state.coordinate1, this.state.coordinate2])
          );

          var firstLocation = maps
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

          var secondLocation = maps
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

              let myMap = new maps.Map("item-map", {
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
    } else {
      setTimeout(this.buildMap, 100);
    }
  }

  componentWillMount() {
    this.buildMap();
  }

  render() {
    return <div id="item-map" />;
  }
}

module.exports = ItemMap;
