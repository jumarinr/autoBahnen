const knex = require('knex');

export default  dataBaseConnection = knex({
    client: 'mysql',
    connection: {
      host : 'remotemysql.com',
      user : 'diRBaWVqul',
      password : 'RMyA2QYEJq',
      database : 'diRBaWVqul'
    }
  });