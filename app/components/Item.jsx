import React from "react";
import { Link, BrowserRouter } from "react-router-dom";
import { ItemsStorage } from "./storage.js";
import ItemRender from "./ItemRender.jsx";

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.getItemById = this.getItemById.bind(this);
  }
  getItemById(arr, itemId) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id == itemId) {
        return i;
      }
    }
  }
  render() {
    let itemId = this.getItemById(
      ItemsStorage.items,
      this.props.match.params.id
    );
    console.log(itemId);

    if (itemId == undefined) {
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
          <ItemRender
            item={ItemsStorage.items[itemId]}
            fields={ItemsStorage.fields}
          />
          ,
          <Link to={`/`}>Вернуться к списку</Link>
        </div>
      );
    }
  }
}

module.exports = Item;
