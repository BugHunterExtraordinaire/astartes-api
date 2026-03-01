const formatSort = (sort) => {
  const sortObj = {}
  if (sort) {
    const fields = sort.split(',');
    for (const field of fields) {
      if (field.startsWith('-')) {
        sortObj[field.slice(1)] = -1;
      } else {
        sortObj[field] = 1;
      }
    }
  }
  return sortObj;
}

module.exports = {
  formatSort
};