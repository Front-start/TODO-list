import React from "react";
import { ItemsStorage } from "./storage.js";
import { SortArray } from "./SortArray.js";

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
          {this.state.items.map(function(item) {
            return (
              <div key={item.id} className="item">
                <ul>
                  <li>
                    {ItemsStorage.fields.id.name} {item.id}
                  </li>
                  <li>
                    {ItemsStorage.fields.date.name}{" "}
                    {new Date(item.date).toString()}
                  </li>
                  <li>
                    {ItemsStorage.fields.date2.name}{" "}
                    {new Date(item.date2).toString()}
                  </li>
                  <li>
                    {ItemsStorage.fields.name.name} {item.name}
                  </li>
                  <li>
                    {ItemsStorage.fields.content.name} {item.content}
                  </li>
                </ul>
              </div>
            );
          })}
        </div>
        <input type="button" value="Отсортировать" onClick={this.sort} />
      </div>
    );
  }
}

module.exports = ItemList;
