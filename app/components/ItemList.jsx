import React from "react";
import { Link, BrowserRouter } from "react-router-dom";
import { ItemsStorage } from "./storage.js";
import { SortArray } from "./SortArray.js";
import ItemRender from "./ItemRender.jsx";
import YouAreHere from "./YouAreHere.jsx";

class ItemList extends React.Component {
  constructor(props) {
    super(props);
    this.sort = this.sort.bind(this);
    this.updateSortingField = this.updateSortingField.bind(this);
    this.updateSortingOrder = this.updateSortingOrder.bind(this);
    this.toggleHighlight = this.toggleHighlight.bind(this);

    this.state = {
      items: ItemsStorage.items,
      order: "desc",
      fieldToSort: "id",
      highlightedItemId: null
    };
  }

  toggleHighlight(x) {
    this.state.highlightedItemId == x
      ? this.setState({ highlightedItemId: null })
      : this.setState({ highlightedItemId: x });
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
      <div className="item-list-wrapper">
        <div>
          <h1>ItemList</h1>
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
        <input type="button" value="Отсортировать" onClick={this.sort} />
        <YouAreHere items={this.state.items} highlight={this.toggleHighlight} />
        <section className="item-list">
          {this.state.items.map(item => (
            <div key={item.id} className="item">
              <ItemRender
                item={item}
                highlightedItemId={this.state.highlightedItemId}
                fields={ItemsStorage.fields}
              />
              <Link to={`/item/${item.id}`}>Открыть запись</Link>
            </div>
          ))}
        </section>
      </div>
    );
  }
}

module.exports = ItemList;
