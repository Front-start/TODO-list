import React from "react";
import { Link, BrowserRouter } from "react-router-dom";
import moment from "moment";
moment.locale("ru");

class ItemRender extends React.Component {
  constructor(props) {
    super(props);

    this.getColor = this.getColor.bind(this);
    this.itemToRender = this.itemToRender.bind(this);

    this.state = { color: this.getColor(this.props.item.state) };
  }
  getColor(value) {
    let hue = (value / 100 * 120).toString(10);
    return ["hsl(", hue, ",100%,50%)"].join("");
  }

  itemToRender(obj) {
    this.name = obj.name;
    this.date = obj.date;
    this.date2 = obj.date2;
    this.location = obj.location;
    this.content = obj.content;
  }

  render() {
    let tempObj = new this.itemToRender(this.props.item);
    return (
      <div key={this.props.item.id}>
        <div className="head">
          <div>
            {"Готовность: "}
            <span style={{ color: this.state.color }}>
              {this.props.item.state}%
            </span>
          </div>

          <div>
            {"Дедлайн: "}
            {moment().to(this.props.item.date2)}
          </div>
        </div>
        <div className="table">
          {Object.keys(tempObj).map(key => (
            <div className="row" key={key + "_row"}>
              <div className="cell" key={key}>
                {this.props.fields[key].name}
                {":"}
              </div>
              <div className="cell" key={key + "_val"}>
                {this.props.fields[key].type == "date"
                  ? moment(this.props.item[key]).format("DD MMMM YYYY[,] HH:MM")
                  : this.props.item[key]}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

module.exports = ItemRender;
