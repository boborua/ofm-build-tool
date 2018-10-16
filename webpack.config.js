/* eslint-disable no-console */

module.exports = function(config, _paths) {
  if (process.env.NODE_ENV === 'production') {
    console.log(_paths);
    return config;
  } else {
    console.log(process.env.NODE_ENV);
    return config;
  }
};
