import { ValidatedMethod } from "meteor/mdg:validated-method";
import SimpleSchema from "simpl-schema";
import { Promise } from "meteor/promise";
import { Meteor } from "meteor/meteor";
import dataBaseConnection from "../../../../startup/dataBaseConnection";

export const deleteVenta = new ValidatedMethod({
  name: "deleteVenta",
  validate: new SimpleSchema({
    codigo: { type: Number }
  }).validator(),
  run({ ...data }) {
    /*
      SELECT  * WHERE cedula: ${data.cedula} FROM EMPLEADO;
    */
    const ventaRepetida = Promise.await(
      dataBaseConnection
        .select()
        .where("codigo", data.codigo)
        .from("VENTA")
        .then(respuesta => {
          const respuestaParseada = JSON.parse(JSON.stringify(respuesta));
          return respuestaParseada;
        })
        .catch(error => {
          console.log(error);
        })
    );
    if (ventaRepetida && ventaRepetida.length === 0) {
      throw new Meteor.Error("No hay una venta para borrar con este código");
    }

    /*
       'DELETE FROM `VENTA` WHERE codigo = data.codigo'
    */
    const resultado = Promise.await(
      dataBaseConnection("VENTA")
        .where("codigo", data.codigo)
        .del()
        .then(resultado => {
          return resultado;
        })
        .catch(error => {
          console.log(error);
          throw new Meteor.Error(
            `Error al eliminar la venta, ${error.sqlMessage}`
          );
        })
    );

    return resultado;
  }
});
