const primaryHouse = (data) => ({
  type: 'PRIMARY_HOUSE',
  payload: data,
});

const investment = (data) => ({
  type: 'INVESTMENT',
  payload: data,
});

export default {
  primaryHouse,
  investment,
};