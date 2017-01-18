var Sequelize = require('sequelize');

// Development
module.exports = new Sequelize('financiersystem_api', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
});

// Production
// module.exports = new Sequelize("");