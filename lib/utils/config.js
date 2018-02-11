const defaults = require(`../../config/${process.env.CONFIG_ENV}.json`);

const config = {...defaults};

module.exports = config;