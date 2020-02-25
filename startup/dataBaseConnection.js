const knex = require('knex');

export default  dataBaseConnection = knex({
    client: 'mysql',
    connection: {
      host : 'localhost',
      user : 'root',
      password : '1007223499',
      database : 'autoBahnen'
    }
  });