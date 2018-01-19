import { Map } from "immutable";
import { fromJS } from "immutable";

var reducer = function(state = Map(), action) {
  switch (action.type) {
    case "SET_STATE":
      return state.merge(action.state);
    case "ADD_ITEM":
      return state.update("items", items => items.push(fromJS(action.item)));
    case "DELETE_ITEM":
      return state.update("items", items =>
        items.filterNot(item => item.get("id") === action.item_id)
      );
    case "SORT":
      return state.update("items", items =>
        items.sort((a, b) => {
          if (action.field_type == "date") {
            return action.order == "asc"
              ? Date.parse(a.get(action.field)) -
                  Date.parse(b.get(action.field))
              : Date.parse(b.get(action.field)) -
                  Date.parse(a.get(action.field));
          } else if (action.field_type == "number") {
            return action.order == "asc"
              ? a.get(action.field) - b.get(action.field)
              : b.get(action.field) - a.get(action.field);
          } else if (action.field_type == "string") {
            return action.order == "asc"
              ? a.get(action.field).localeCompare(b.get(action.field))
              : b.get(action.field).localeCompare(a.get(action.field));
          }
        })
      );
  }
  return state;
};

module.exports = reducer;
