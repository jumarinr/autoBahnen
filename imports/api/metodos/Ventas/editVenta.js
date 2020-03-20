import { ValidatedMethod } from "meteor/mdg:validated-method";
import SimpleSchema from "simpl-schema";
import { Promise } from "meteor/promise";
import { Meteor } from "meteor/meteor";
import dataBaseConnection from "../../../../startup/dataBaseConnection";

export const editVenta = new ValidatedMethod({
  name: "editVenta",
  validate: new SimpleSchema({
    codigo: { type: Number },
    // fecha: {type :Date},
    clienteCedula: { type: Number },
    empleadoCedula: { type: Number }
  }).validator(),
  run({ ...data }) {
    /*
      SELECT * FROM EMPLEADO WHERE cedula = data.empleadoCedula
    */
    const cedulaVendedor = Promise.await(
      dataBaseConnection
        .select()
        .whereRaw(`cedula = ${data.empleadoCedula} and isAsesor =  true`)
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
       'UPDATE VENTA SET empleadoCedula, clienteCedula WHERE codigo = data.codigo'
    */
    const resultado = Promise.await(
      dataBaseConnection("VENTA")
        .where("codigo", data.codigo)
        .update(data)
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
