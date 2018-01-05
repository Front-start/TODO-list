import React from "react";
import ItemList from "./ItemList.jsx";
import YouAreHere from "./YouAreHere.jsx";

class Main extends React.Component {
  render() {
    return (
      <div>
        <YouAreHere />
        <ItemList />
      </div>
    );
  }
}

module.exports = Main;
