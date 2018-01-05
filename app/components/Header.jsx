import React from "react";
import moment from "moment";
moment.locale("ru");

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      PreviousSessionTime: localStorage.getItem("PreviousSessionTime"),
      Location: localStorage.getItem("Location").name
    };
  }

  render() {
    return (
      <header>
        <div style={{ float: "left" }}>
          <h1>Super_*TODO_list*_V.i.P</h1>
        </div>
        <div style={{ float: "right" }}>
          <p>
            {"Предыдущее посещение: "}
            {this.state.PreviousSessionTime
              ? moment(this.state.PreviousSessionTime).from()
              : "Вы пришли в первый раз!"}
          </p>
          <p>{"Текущее местоположение: " + this.state.Location}</p>
        </div>
      </header>
    );
  }
}

module.exports = Header;
