/* eslint-disable @typescript-eslint/no-var-requires */
const { override } = require('customize-cra');
const { addReactRefresh } = require('customize-cra-react-refresh');

module.exports = override(addReactRefresh());
