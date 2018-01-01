export let SortArray = {
  sort(array, field, type, order) {
    function compare(a, b) {
      if (type == "date" || type == "number") {
        return order == "asc" ? a[field] - b[field] : b[field] - a[field];
      } else if (type == "string") {
        return order == "asc"
          ? a[field].localeCompare(b[field])
          : b[field].localeCompare(a[field]);
      }
    }
    array.sort(compare);
  }
};