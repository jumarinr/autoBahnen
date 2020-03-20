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
    /* SELECT * from VENTA where codigo = data.codigo
     */
    const elementosEncontrados = Promise.await(
      dataBaseConnection
        .select()
        .from(dataBaseConnection.raw("VENTA"))
        .whereRaw(`VENTA.codigo = ${data.codigo}`)
        .then(respuesta => {
          const respuestaParseada = JSON.parse(JSON.stringify(respuesta));
          return respuestaParseada;
        })
        .catch(error => {
          console.log(error);
          throw new Meteor.Error(`Error en la búsqueda: ${error.sqlMessage}`);
        })
    );
    return elementosEncontrados[0];
  }
});
