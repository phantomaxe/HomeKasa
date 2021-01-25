const testOneHouse = (data) => ({
  type: 'TESTONE_HOUSE',
  payload: data,
});
const testTwoHouse = (data) => ({
  type: 'TESTTWO_HOUSE',
  payload: data,
});

export default {
  testOneHouse,
  testTwoHouse,
};