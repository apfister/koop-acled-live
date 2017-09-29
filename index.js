const provider = {
  type: 'provider',
  name: 'acled-live',
  hosts: false,
  disableIdParam: true,
  Model: require('./model'),
  version: require('./package.json').version
};

module.exports = provider;
