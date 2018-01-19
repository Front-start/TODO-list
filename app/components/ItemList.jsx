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
          {this.props.items.map(item => (
            <div key={item.id} className="item">
              <ItemRender
                item={item}
                highlightedItemId={this.state.highlightedItemId}
                fields={this.props.fields}
              />
              <Link to={`/item/${item.id}`}>Открыть запись</Link>
            </div>
          ))}
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

  return {
    fields: obj2,
    items: obj
  };
}

module.exports = connect(mapStateToProps, actions)(ItemList);
