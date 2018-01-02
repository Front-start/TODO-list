import React from "react";
import moment from "moment";
moment.locale("ru");

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      PreviousSessionTime: localStorage.getItem("PreviousSessionTime")
    };
  }

  componentWillMount() {
    localStorage.setItem("PreviousSessionTime", new Date());
  }

  render() {
    return (
      <div style={{ height: "100px" }}>
        <div style={{ float: "left" }}>
          <h1>Super_*TODO_list*_V.i.P</h1>
        </div>
        <div style={{ float: "right" }}>
          <span>
            {"Предыдущее посещение: "}

            {this.state.PreviousSessionTime
              ? moment(this.state.PreviousSessionTime).from(new Date())
              : "Вы пришли в первый раз!"}
          </span>
        </div>
      </div>
    );
  }
}

module.exports = Header;
