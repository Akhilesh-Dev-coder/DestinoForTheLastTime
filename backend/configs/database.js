const knex = require('knex');

const db = knex({
  client: 'mysql',
  connection: {
    host: 'mysql.apexhosting.gdn',
    port: 3306,
    user: 'apexMC960857',
    password: '$x861gneGs12b^t0ROnKpAx@',
    database: 'apexMC960857',
  },
});

module.exports = db;