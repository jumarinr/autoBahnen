// importamos una tabla de referencia con la información de las tablas de la base de datos
const tablas = JSON.parse(Assets.getText('tablas.json'));
// importamos la conexión con la base de datos
import dataBaseConnection from './dataBaseConnection';


// exportamos la función que se inicia cuando  la aplicación arranca 
export default onStartApp = ()=>{
    // iteramos sobre los registros de tabla guardados en tablas
      tablas.map((tabla)=>{
        /* La operación es equivalente a select * from "nombreTablaSobreLaQueSeItera"
          Esta operación se da para  poder seleccionar todos los elementos de la tabla sobre la que se itere. 
        */
        dataBaseConnection.select().from(`${tabla.nombre}`).catch((error)=>{
          // si hay un error al buscar la tabla (o sea, q ue la tabla no exista) se va a crear la tabla con los atributos guardados en el json
            if(error.code === 'ER_NO_SUCH_TABLE'){
                console.log(`No se encontró la tabla con nombre ${tabla.nombre}, error sql: ${error.sqlMessage}`)
              /* creamos la tabla, es equivalente a:
              CREATE TABLE ${nombreTabla};
              */
              dataBaseConnection.schema.createTable(`${tabla.nombre}`, (nuevaTabla) => {
                // si la tabla tiene atributos, la creamos con los atributos
                if(tabla.atributos && tabla.atributos.length > 0 ){
                // iteramos sobre los atributos
                tabla.atributos.map((atribu)=>{
                  // si el atributo es clave primaria, lo creamos como tal
                  if(atribu.cp){
                  nuevaTabla[`${atribu.tipo}`](`${atribu.nombre}`).primary();
                  }
                  // si el atributo es obligatorio, lo  creamos como tal
                  else if(atribu.obligatorio){
                    nuevaTabla[`${atribu.tipo}`](`${atribu.nombre}`).notNullable();
                  }
                  // si el atributo es clave foranea, lo creamos como tal con la referencia a la tabla foranea
                  else if(atribu.cf){
                    nuevaTabla[`${atribu.tipo}`](`${atribu.nombre}`).notNullable();

                    nuevaTabla.foreign(`${atribu.nombre}`).references(`${atribu.referenceAtribbute}`).inTable(`${atribu.referenciaTable}`);
                  }
                  // si no, creamos el atributo como opcional (con valores nulos)
                  else{
                    nuevaTabla[`${atribu.tipo}`](`${atribu.nombre}`);
                  }
                })
              }
              // si no hay atributos, lanzamos error
              else{
                throw new Error('No se encontró atributos en la tabla, por favor ajuste el archivo tablas.json')
              }
            }).then((respuesta)=>console.log(`Tabla ${tabla.nombre} creada con éxito`)).catch((mistake)=>{
              console.log(mistake)
            }) 
      }})   
      })

}
