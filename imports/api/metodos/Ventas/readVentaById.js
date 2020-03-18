import { ValidatedMethod } from "meteor/mdg:validated-method";
import dataBaseConnection from "../../../../startup/dataBaseConnection";
import { Meteor } from "meteor/meteor";
import SimpleSchema from "simpl-schema";

export const readVentaById = new ValidatedMethod({
  name: "readVentaById",
  validate: new SimpleSchema({
    codigo: { type: Number }
  }).validator(),
  run(data) {
    /* SELECT codigo, fecha, EMPLEADO.nombre_completo as empleado, CLIENTE.nombre_completo as cliente
       * FROM VENTA, CLIENTE, EMPLEADO
       WHERE EMPLEADO.cedula = VENTA.empleadoCedula and CLIENTE.cedula =Venta.clienteCedula;

        retorna todos los elementos de la tabla VENTA
       */
    const elementosEncontrados = Promise.await(
      dataBaseConnection
        .select()
        .from(dataBaseConnection.raw("VENTA"))
        .whereRaw(`VENTA.codigo = ${data.codigo}`)
        .then(respuesta => {
          console.log(respuesta);
          const respuestaParseada = JSON.parse(JSON.stringify(respuesta));
          return respuestaParseada;
        })
        .catch(error => {
          console.log(error);
          throw new Meteor.Error(`Error en la búsqueda: ${error.sqlMessage}`);
        })
    );
    console.log(elementosEncontrados);
    return elementosEncontrados[0];
  }
});
