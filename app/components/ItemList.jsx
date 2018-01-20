import React from "react";
import { Link, BrowserRouter } from "react-router-dom";
import ItemRender from "./ItemRender.jsx";
import YouAreHere from "./YouAreHere.jsx";

import { connect } from "react-redux";
import actions from "./actions.jsx";

class ItemList extends React.Component {
  constructor(props) {
    super(props);
    this.sort = this.sort.bind(this);
    this.updateSortingField = this.updateSortingField.bind(this);
    this.updateSortingOrder = this.updateSortingOrder.bind(this);
    this.toggleHighlight = this.toggleHighlight.bind(this);

    this.state = {
      order: "asc",
      fieldToSort: "name",
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
    this.props.sortItems(
      this.state.fieldToSort,
      this.state.order,
      this.props.fields[this.state.fieldToSort].type
    );
  }

  updateSortingField(e) {
    this.setState({ fieldToSort: e.target.value });
  }
  updateSortingOrder(e) {
    this.setState({
      order: e.target.value == "По возрастанию" ? "desc" : "asc"
    });
  }

  render() {
    return (
      <div className="item-list-wrapper">
        <div>
          <h1>Список дел</h1>
        </div>
        <select onChange={this.updateSortingField}>
          {Object.keys(this.props.fields).map(key => (
            <option key={key} value={key}>
              {this.props.fields[key].name}
            </option>
          ))}
        </select>
        <input
          type="button"
          value={this.state.order == "asc" ? "По возрастанию" : "По убыванию"}
          ref="order"
          onClick={this.updateSortingOrder}
        />
        <input type="button" value="Отсортировать" onClick={this.sort} />
        <YouAreHere highlight={this.toggleHighlight} />
        <section className="item-list">
          {this.props.items.map(item => {
            let cls =
              item.id == this.state.highlightedItemId
                ? "item highlightedItem"
                : "item";
            return (
              <div key={item.id} className={cls}>
                <ItemRender item={item} fields={this.props.fields} />

                <div className="bot">
                  <Link to={`/item/${item.id}`}>Открыть запись</Link>
                </div>
              </div>
            );
          })}
        </section>
      </div>
    );
  }
}

function mapStateToProps(state) {
  let obj = state.get("items").toJS();
  let obj2 = state.get("fields").toJS();

  obj.map(item => {
    Object.defineProperty(item, "state", { enumerable: false });
    Object.defineProperty(item, "coordinates", { enumerable: false });
  });

  Object.defineProperty(obj2, "id", { enumerable: false });
  Object.defineProperty(obj2, "content", { enumerable: false });

  return {
    fields: obj2,
    items: obj
  };
}

module.exports = connect(mapStateToProps, actions)(ItemList);
