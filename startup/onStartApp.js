const knex = require('knex');
const tablas = JSON.parse(Assets.getText('tablas.json'));

export default onStartApp = ()=>{
    const dataBaseConnection = knex({
        client: 'mysql',
        connection: {
          host : 'localhost',
          user : 'root',
          password : '1007223499',
          database : 'autoBahnen'
        }
      });
      tablas.map((tabla)=>{
        /* La operación es equivalente a select * from "nombreTablaSobreLaQueSeItera" 
          Esta operación se da para poder seleccionar todos los elementos de la tabla sobre la que se itere. 
        */
        dataBaseConnection.select().from(`${tabla.nombre}`).then((response)=>{
            console.log(response)
            const resultadoBusqueda = JSON.parse(JSON.stringify(response));
            console.log(resultadoBusqueda[0])
          }).catch((error)=>{
            console.log(error)
            if(error.code === 'ER_NO_SUCH_TABLE'){
                console.log(`No se encontró la tabla con nombre ${tabla.nombre}, error sql: ${error.sqlMessage}`)
              dataBaseConnection.schema.createTable(`${tabla.nombre}`, (nuevaTabla) => {
                if(tabla.atributos && tabla.atributos.length > 0 ){
                tabla.atributos.map((atribu)=>{
                  if(atribu.cp){
                  nuevaTabla[`${atribu.tipo}`](`${atribu.nombre}`).primary();
                  }
                  else if(atribu.obligatorio){
                    nuevaTabla[`${atribu.tipo}`](`${atribu.nombre}`).notNullable();
                  }else if(atribu.cf){
                    nuevaTabla[`${atribu.tipo}`](`${atribu.nombre}`).notNullable();

                    nuevaTabla.foreign(`${atribu.nombre}`).references(`${atribu.referenceAtribbute}`).inTable(`${atribu.referenciaTable}`);
                  }else{
                    nuevaTabla[`${atribu.tipo}`](`${atribu.nombre}`);
                  }
                })
              }else{
                throw new Error('No se encontró atributos en la tabla,  por favor ajuste el archivo tablas.json')
              }
            }).then((respuesta)=>console.log(`Tabla ${tabla.nombre} creada con éxito`)).catch((mistake)=>{
              console.log(mistake)
            })
      }})   
      })

}
