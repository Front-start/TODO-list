import React from "react";
import { Link, BrowserRouter } from "react-router-dom";
import moment from "moment";
moment.locale('ru');

class ItemRender extends React.Component {
  constructor(props) {
    super(props);

    this.getColor = this.getColor.bind(this);

    this.state = { color: this.getColor(this.props.item.state) };
  }
  getColor(value) {
    let hue = (value / 100 * 120).toString(10);
    return ["hsl(", hue, ",100%,50%)"].join("");
  }
  render() {
    let fields = this.props.fields;
    let item = this.props.item;
    return (
      <div key={this.props.item.id} className="itemSingle">
        <div>
          Готовность: <span style={{ color: this.state.color }}>{this.props.item.state}%</span>
        </div>
        <div>
          До дедлайна: {moment().to(item.date2)}
        </div>
        <ul>
          {Object.keys(item).map(function(key) {
            return (
              <li key={key}>
                {fields[key].name} - {fields[key].type == "date" ? moment(item[key]).format('DD MMMM YYYY[,] HH:MM') : item[key]}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

module.exports = ItemRender;
