var React = require("react");
var connect = require("react-redux").connect;
var actions = require("./actions.jsx");

class PhoneForm extends React.Component {
  constructor(props) {
    super(props);
  }
  onClick() {
    if (this.refs.phoneInput.value !== "") {
      var itemText = this.refs.phoneInput.value;
      this.refs.phoneInput.value = "";
      return this.props.addItem({ id: itemText });
    }
  }
  render() {
    return (
      <div>
        <input ref="phoneInput" />
        <button onClick={this.onClick.bind(this)}>Добавить</button>
      </div>
    );
  }
}

class PhoneItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <p>
          <b>{this.props.text}</b>
          <br />
          <button onClick={() => this.props.deleteItem(this.props.text)}>
            Удалить
          </button>
        </p>
      </div>
    );
  }
}

class PhonesList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        {this.props.items.map(item => {
          console.log(item);
          return (
            <PhoneItem
              key={item.get("id")}
              text={item.get("id")}
              deleteItem={this.props.deleteItem}
            />
          );
        })}
      </div>
    );
  }
}

class AppView extends React.Component {
  render() {
    return (
      <div>
        <PhoneForm addItem={this.props.addItem} />
        <PhonesList {...this.props} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    items: state.get("items")
  };
}

module.exports = connect(mapStateToProps, actions)(AppView);
