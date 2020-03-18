import { ValidatedMethod } from "meteor/mdg:validated-method";
import SimpleSchema from "simpl-schema";
import { Promise } from "meteor/promise";
import { Meteor } from "meteor/meteor";
import dataBaseConnection from "../../../../startup/dataBaseConnection";

export const editEmpleado = new ValidatedMethod({
  name: "editEmpleado",
  validate: new SimpleSchema({
    cedulaAntigua: { type: Number },
    cedula: { type: Number },
    nombre_completo: { type: String },
    telefono: { type: Number },
    salario_base: { type: Number },
    direccion: { type: String, optional: true },
    isAsesor: { type: Boolean },
    comision: { type: Number, optional: true },
    codigoSede: { type: Number, optional: true }
  }).validator(),
  run({ ...data }) {
    const cedulaAntigua = data.cedulaAntigua;
    delete data.cedulaAntigua;
    if (data.isAsesor && (!data.comision || !data.codigoSede)) {
      throw new Meteor.Error(
        "Debe seleccionar una comisión y/o una sede a la cual pertenece el asesor"
      );
    }
    if (data.codigoSede && !data.isAsesor) {
      throw new Meteor.Error("Un gerente no tiene aqui una sede");
    }
    if (data.isAsesor && data.codigoSede) {
      /*
      select * from SEDE where codigo = data.codigoSede
      */
      const validarSede = Promise.await(
        dataBaseConnection
          .select()
          .where("codigo", data.codigoSede)
          .from("SEDE")
          .then(respuesta => {
            const respuestaParseada = JSON.parse(JSON.stringify(respuesta));
            return respuestaParseada;
          })
          .catch(error => {
            console.log(error);
          })
      );
      if (validarSede && validarSede.length === 0) {
        throw new Meteor.Error("La sede no existe");
      }
    }
    if (cedulaAntigua != data.cedula) {
      /*
      SELECT * WHERE cedula = ${data.cedula} FROM EMPLEADO;
    */
      const cedulaRepetida = Promise.await(
        dataBaseConnection
          .select()
          .where("cedula", data.cedula)
          .from("EMPLEADO")
          .then(respuesta => {
            const respuestaParseada = JSON.parse(JSON.stringify(respuesta));
            return respuestaParseada;
          })
          .catch(error => {
            console.log(error);
          })
      );
      if (cedulaRepetida && cedulaRepetida.length > 0) {
        throw new Meteor.Error("La cedula ya esta registrada en base de datos");
      }
    }

    /*
       'insert into `EMPLEADO` (`cedula`, `nombre_completo`, `salario_base`, `telefono`) values (cedula, \'nombre\', telefono, salario)'
    */
    const resultado = Promise.await(
      dataBaseConnection("EMPLEADO")
        .where("cedula", cedulaAntigua)
        .update(data)
        .then(resultado => {
          return resultado;
        })
        .catch(error => {
          console.log(error);
          throw new Meteor.Error(
            `Error al editar el empleado, ${error.sqlMessage}`
          );
        })
    );

    return resultado;
  }
});
