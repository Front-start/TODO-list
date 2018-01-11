import React from "react";
import { Link, BrowserRouter } from "react-router-dom";
import moment from "moment";
moment.locale("ru");

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

  componentWillReceiveProps(nextProps) {
    this.props.item.id == nextProps.highlightedItemId
      ? this.setState({ classes: "highlightedItem" })
      : this.setState({ classes: "" });
  }

  render() {
    return (
      <div key={this.props.item.id} className={this.state.classes}>
        <div>
          <p>
            {"Готовность: "}
            <span style={{ color: this.state.color }}>
              {this.props.item.state}%
            </span>
          </p>
          <p>
            {"Дедлайн: "}
            {moment().to(this.props.item.date2)}
          </p>
        </div>
        <ul>
          {Object.keys(this.props.item).map(key => (
            <li key={key}>
              {this.props.fields[key].name}
              {" - "}
              {this.props.fields[key].type == "date"
                ? moment(this.props.item[key]).format("DD MMMM YYYY[,] HH:MM")
                : this.props.item[key]}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

module.exports = ItemRender;
