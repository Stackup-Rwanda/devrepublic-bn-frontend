const pagination = (array, start) => array.slice(((start - 1) * 5), (((start - 1) * 5)) + 5);
export default pagination;
