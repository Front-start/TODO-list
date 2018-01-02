import React from "react";
import { Link, BrowserRouter } from "react-router-dom";
import { ItemsStorage } from "./storage.js";
import { SortArray } from "./SortArray.js";
import ItemRender from "./ItemRender.jsx";

class ItemList extends React.Component {
  constructor(props) {
    super(props);
    this.sort = this.sort.bind(this);
    this.updateSortingField = this.updateSortingField.bind(this);
    this.updateSortingOrder = this.updateSortingOrder.bind(this);

    this.state = {
      items: ItemsStorage.items,
      order: "desc",
      fieldToSort: "id"
    };
  }

  componentWillMount() {
    this.sort();
  }

  sort() {
    SortArray.sort(
      ItemsStorage.items,
      this.state.fieldToSort,
      ItemsStorage.fields[this.state.fieldToSort].type,
      this.state.order
    );

    this.setState({ items: ItemsStorage.items });
  }

  updateSortingField(e) {
    this.setState({ fieldToSort: e.target.value });
  }
  updateSortingOrder(e) {
    this.setState({ order: e.target.value == "asc" ? "desc" : "asc" });
  }

  render() {
    return (
      <div>
        <div>
          <h1 style={{ color: "red" }}>ItemList</h1>
        </div>
        <select onChange={this.updateSortingField}>
          {Object.keys(ItemsStorage.fields).map(function(key) {
            return (
              <option key={key} value={key}>
                {ItemsStorage.fields[key].name}
              </option>
            );
          })}
        </select>
        <input
          type="button"
          value={this.state.order}
          ref="order"
          onClick={this.updateSortingOrder}
        />
        <div className="item-list">
          {this.state.items.map(item => (
            <div key={item.id} className="item">
              <ItemRender item={item} fields={ItemsStorage.fields} />
              <Link to={`/item/${item.id}`}>Открыть запись</Link>
            </div>
          ))}
        </div>
        <input type="button" value="Отсортировать" onClick={this.sort} />
      </div>
    );
  }
}

module.exports = ItemList;
