var Map = require("immutable").Map;
var { fromJS } = require("immutable");

var reducer = function(state = Map(), action) {
  switch (action.type) {
    case "SET_STATE":
      return state.merge(action.state);
    case "ADD_ITEM":
      return state.update("items", items => items.push(fromJS(action.item)));
    case "DELETE_ITEM":
      return state.update("items", items =>
        items.filterNot(item => item.get("id") === action.item)
      );
  }
  return state;
};

module.exports = reducer;
