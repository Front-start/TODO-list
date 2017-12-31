import React from "react";
import { items as itemsFromStorage } from "./storage.js";

class ItemList extends React.Component {
  constructor(props) {
    super(props);
    this.sort = this.sort.bind(this);
    this.updateSortingField = this.updateSortingField.bind(this);
    this.updateSortingOrder = this.updateSortingOrder.bind(this);

    this.state = { items: itemsFromStorage, order: "desc", fieldToSort: "id" };
  }

  sort() {
    let order = this.state.order;
    let field = this.state.fieldToSort;
    console.log(order, field);
    function compareByField(a, b) {
      return order == "asc" ? a[field] - b[field] : b[field] - a[field];
    }

    itemsFromStorage.sort(compareByField);

    this.setState({ items: itemsFromStorage });
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
          <option value="id">id</option>
          <option value="date">date</option>
          <option value="name">name</option>
        </select>
        <input
          type="button"
          value={this.state.order}
          ref="order"
          onClick={this.updateSortingOrder}
        />
        <ul>
          {this.state.items.map(function(item) {
            return (
              <li key={item.id}>
                {item.id} - {new Date(item.date).toString()} - {item.name} -{" "}
                {item.content}
              </li>
            );
          })}
        </ul>
        <input type="button" value="Отсортировать" onClick={this.sort} />
      </div>
    );
  }
}

module.exports = ItemList;
