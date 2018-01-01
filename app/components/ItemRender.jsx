import React from "react";
import { Link, BrowserRouter } from "react-router-dom";

class ItemRender extends React.Component {
  render() {
    let fields = this.props.fields;
    let item = this.props.item;
    return (
      <div key={this.props.item.id} className="itemSingle">
        <ul>
          {Object.keys(item).map(function(key) {
            if (fields[key].type == "date") {
              return (
                <li key={key}>
                  {fields[key].name} - {new Date(item[key]).toString()}
                </li>
              );
            }
            return (
              <li key={key}>
                {fields[key].name} - {item[key]}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

module.exports = ItemRender;
