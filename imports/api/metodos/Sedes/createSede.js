import { ValidatedMethod } from "meteor/mdg:validated-method";
import SimpleSchema from "simpl-schema";
import { Promise } from "meteor/promise";
import { Meteor } from "meteor/meteor";
import dataBaseConnection from "../../../../startup/dataBaseConnection";

export const createSede = new ValidatedMethod({
  name: "createSede",
  validate: new SimpleSchema({
    codigo: { type: Number },
    nombre: { type: String },
    telefono: { type: Number },
    direccion: { type: String, optional: true },
    municipio: { type: String },
    email: { type: String, optional: true },
    gerenteCedula: { type: Number }
  }).validator(),
  run({ ...data }) {
    if (data.isAsesor && !data.comision) {
      throw new Meteor.Error("Debe seleccionar una comisión");
    }
    /*
      SELECT * WHERE codigo: ${data.codigo} FROM SEDE;
    */
    const codigoRepetido = Promise.await(
      dataBaseConnection
        .select()
        .where("codigo", data.codigo)
        .from("SEDE")
        .then(respuesta => {
          const respuestaParseada = JSON.parse(JSON.stringify(respuesta));
          return respuestaParseada;
        })
        .catch(error => {
          console.log(error);
        })
    );
    if (codigoRepetido && codigoRepetido.length > 0) {
      throw new Meteor.Error(
        "La codigo de sede ya esta registrado en base de datos"
      );
    }
    /*
    SELECT * FROM EMPLEADO WHERE cedula = data.gerenteCedula
    */
    const cedulaGerente = Promise.await(
      dataBaseConnection
        .select()
        .where("cedula", data.gerenteCedula)
        .from("EMPLEADO")
        .then(respuesta => {
          const respuestaParseada = JSON.parse(JSON.stringify(respuesta));
          return respuestaParseada;
        })
        .catch(error => {
          console.log(error);
        })
    );
    if (!cedulaGerente || cedulaGerente.length === 0) {
      throw new Meteor.Error("No se encontró la cedula del vendedor");
    }
    /*
    SELECT * FROM SEDE WHERE gerenteCedula = data.gerenteCedula
    */
    const gerenteConSede = Promise.await(
      dataBaseConnection
        .select()
        .where("gerenteCedula", data.gerenteCedula)
        .from("SEDE")
        .then(respuesta => {
          const respuestaParseada = JSON.parse(JSON.stringify(respuesta));
          return respuestaParseada;
        })
        .catch(error => {
          console.log(error);
        })
    );
    if (gerenteConSede.length > 0) {
      throw new Meteor.Error("El gerente ya tiene asociada una sede");
    }
    /*
       'insert into `SEDE` (`codigo`, `nombre`, `direccion`, `telefono`, `municipio`, `email`, `gerenteCedula`) values (`data.codigo`, `data.nombre`, `data.direccion`, `data.telefono`, `data.municipio`, `data.email`, `data.gerenteCedula`)'
    */
    const resultado = Promise.await(
      dataBaseConnection("SEDE")
        .insert(data)
        .then(resultado => {
          return resultado;
        })
        .catch(error => {
          console.log(error);
          throw new Meteor.Error(`Error al crear la sede, ${error.sqlMessage}`);
        })
    );

    return resultado;
  }
});
