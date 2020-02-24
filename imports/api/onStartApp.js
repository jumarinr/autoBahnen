const knex = require('knex');
const tablas = JSON.parse(Assets.getText('tablas.json'));

export default onStartApp = ()=>{
    const dataBaseConnection = knex({
        client: 'mysql',
        connection: {
          host : 'localhost',
          user : 'root',
          password : '1007223499',
          database : 'prueba'
        }
      });
      tablas.map((tabla)=>{
        dataBaseConnection.select().from(`${tabla.nombre}`).then((response)=>{
            console.log(response)
          }).catch((error)=>{
            
            if(error.code === 'ER_NO_SUCH_TABLE'){
                console.log(`No se encontró la tabla con nombre ${tabla.nombre}, error sql: ${error.sqlMessage}`)
            }
          })   
      })

}
