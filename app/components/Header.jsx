import React from "react";
import moment from "moment";
moment.locale("ru");

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.updateInfo = this.updateInfo.bind(this);

    this.state = {
      PreviousSessionTime: null,
      Location: "Не удалось определить :("
    };
  }

  updateInfo() {
    if (localStorage.getItem("Location")) {
      this.setState({
        PreviousSessionTime: localStorage.getItem("PreviousSessionTime"),
        Location: JSON.parse(localStorage.getItem("Location")).name
      });
    } else setTimeout(this.updateInfo, 100);
  }

  componentDidMount() {
    this.updateInfo();
  }

  render() {
    return (
      <header>
        <div className="title">
          <h1>Super_*TODO_list*_V.i.P</h1>
        </div>
        <div className="info">
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
