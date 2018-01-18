var addItem = function(item) {
  return {
    type: "ADD_ITEM",
    item
  };
};
var deleteItem = function(item) {
  return {
    type: "DELETE_ITEM",
    item
  };
};

module.exports = { addItem, deleteItem };
