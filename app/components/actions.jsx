var addItem = function(item) {
  return {
    type: "ADD_ITEM",
    item
  };
};
var sortItems = function(field, order, field_type) {
  return {
    type: "SORT",
    field,
    order,
    field_type
  };
};
var deleteItem = function(item_id) {
  return {
    type: "DELETE_ITEM",
    item_id
  };
};

module.exports = { addItem, deleteItem, sortItems };
