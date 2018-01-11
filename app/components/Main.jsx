import React from "react";
import ItemList from "./ItemList.jsx";

class Main extends React.Component {
  render() {
    return (
      <div className="main">
        <ItemList />
      </div>
    );
  }
}

module.exports = Main;
