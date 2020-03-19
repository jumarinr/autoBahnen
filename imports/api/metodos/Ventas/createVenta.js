import { ValidatedMethod } from "meteor/mdg:validated-method";
import SimpleSchema from "simpl-schema";
import { Promise } from "meteor/promise";
import { Meteor } from "meteor/meteor";
import dataBaseConnection from "../../../../startup/dataBaseConnection";

export const createVenta = new ValidatedMethod({
  name: "createVenta",
  validate: new SimpleSchema({
    codigo: { type: Number },
    fecha: { type: Date },
    clienteCedula: { type: Number },
    empleadoCedula: { type: Number }
  }).validator(),
  run({ ...data }) {
    /*
      SELECT  * FROM VENTA WHERE codigo: ${data.codigo};
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
    if (ventaRepetida && ventaRepetida.length > 0) {
      throw new Meteor.Error("Este código de venta ya esta registrado");
    }
    /*
 SELECT * FROM EMPLEADO WHERE cedula = data.empleadoCedula;
 */
    const cedulaVendedor = Promise.await(
      dataBaseConnection
        .select()
        .where("cedula", data.empleadoCedula)
        .from("EMPLEADO")
        .then(respuesta => {
          const respuestaParseada = JSON.parse(JSON.stringify(respuesta));
          return respuestaParseada;
        })
        .catch(error => {
          console.log(error);
        })
    );
    if (!cedulaVendedor || cedulaVendedor.length === 0) {
      throw new Meteor.Error("No se encontró la cedula del vendedor");
    }
    /*
  SELECT * FROM CLIENTE WHERE cedula = data.clienteCedula
*/
    const cedulaCliente = Promise.await(
      dataBaseConnection
        .select()
        .where("cedula", data.clienteCedula)
        .from("CLIENTE")
        .then(respuesta => {
          const respuestaParseada = JSON.parse(JSON.stringify(respuesta));
          return respuestaParseada;
        })
        .catch(error => {
          console.log(error);
        })
    );
    if (!cedulaCliente || cedulaCliente.length === 0) {
      throw new Meteor.Error("No se encontró la cedula del cliente");
    }

    /*
       'insert into `VENTA` (`codigo`, `fecha`, `empleadoCedula`, `clienteCedula`) values (`codigo`, `fecha`, `empleadoCedula`, `clienteCedula`)'
    */
    const resultado = Promise.await(
      dataBaseConnection("VENTA")
        .insert(data)
        .then(resultado => {
          return resultado;
        })
        .catch(error => {
          console.log(error);
          throw new Meteor.Error(
            `Error al crear la venta, ${error.sqlMessage}`
          );
        })
    );

    return resultado;
  }
});
