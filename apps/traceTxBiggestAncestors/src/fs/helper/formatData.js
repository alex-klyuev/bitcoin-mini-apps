const formatData = (data, length) => {
  let str = ' ';
  str += data;
  let n = length - str.length;
  for (let i = 0; i < n - 1; i++) str += ' ';
  str += ' ';
  return str;
};

module.exports = formatData;
