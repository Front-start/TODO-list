import React from "react";
import moment from "moment";
moment.locale("ru");
import Datetime from "react-datetime";
import ymaps from "ymaps";
import { connect } from "react-redux";
import actions from "./actions.jsx";

class AddItem extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.getLocationCoordinates = this.getLocationCoordinates.bind(this);
    this.createItem = this.createItem.bind(this);

    this.state = {
      date2: null,
      coordinates: null
    };
  }

  createItem(name, date2, location, coordinates, content) {
    this.id = null;
    this.location = location;
    this.state = 0;
    this.coordinates = coordinates;
    this.name = name;
    this.date = moment().toISOString();
    this.date2 = date2;
    this.content = content;
  }

  onDateChange(date) {
    this.setState({ date2: date });
  }

  getLocationCoordinates(e) {
    let str = e.target.value;
    ymaps.load("https://api-maps.yandex.ru/2.1/?lang=ru_RU").then(maps => {
      maps
        .geocode(str, {
          results: 1
        })
        .then(res =>
          this.setState({
            coordinates: res.geoObjects.get(0).geometry.getCoordinates()
          })
        );
    });
  }

  onSubmit(e) {
    e.preventDefault();
    let obj = new this.createItem(
      this.refs.name.value,
      this.state.date2.toISOString(),
      this.refs.location.value,
      this.state.coordinates,
      this.refs.content.value
    );
    this.props.addItem(obj);
    alert("Добавлена (вероятно). Теперь можно вернуться к списку и проверить.");
  }

  render() {
    return (
      <div>
        <div className="head">
          <h1>{"Добавление записей"}</h1>
          <p>
            {
              "Никаких проверок, никакого оформления, никаких подтверждений, ничего не всплывает, мне уже лень"
            }
          </p>
        </div>
        <form>
          <div>
            <label htmlFor="name">Заголовок</label>
            <input ref="name" id="name" type="text" />
          </div>
          <div>
            <label style={{ float: "left" }}>Дедлайн</label>
            <Datetime onChange={this.onDateChange} />
          </div>
          <div>
            <label htmlFor="location">Место</label>
            <input
              id="location"
              type="text"
              ref="location"
              onBlur={this.getLocationCoordinates}
            />
            <span>
              Тут нужно написать строку типа "нижние петушки" или "китай,
              провинция битординь" и яндекс попытается что-то найти и определить
              координаты...
            </span>
          </div>
          <div>
            <label htmlFor="content">Действие</label>
            <textarea ref="content" rows="10" cols="100" id="content" />
          </div>
          <div>
            <input type="submit" value="Добавить" onClick={this.onSubmit} />
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    items: state.get("items")
  };
}

module.exports = connect(mapStateToProps, actions)(AddItem);
