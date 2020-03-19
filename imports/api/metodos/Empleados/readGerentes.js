import { ValidatedMethod } from "meteor/mdg:validated-method";
import dataBaseConnection from "../../../../startup/dataBaseConnection";
import { Meteor } from "meteor/meteor";

export const readGerentes = new ValidatedMethod({
  name: "readGerentes",
  validate: () => {},
  run() {
    /* SELECT * FROM EMPLEADO WHERE isAsesor = false; 
        retorna todos los elementos de la tabla EMPLEADO que sean gerentes (is asesor en false)
       */
    const elementosEncontrados = Promise.await(
      dataBaseConnection
        .select()
        .from("EMPLEADO")
        .where("isAsesor", false)
        .then(respuesta => {
          const respuestaParseada = JSON.parse(JSON.stringify(respuesta));
          return respuestaParseada;
        })
        .catch(error => {
          console.log(error);
          throw new Meteor.Error(`Error en la búsqueda: ${error.sqlMessage}`);
        })
    );
    return elementosEncontrados;
  }
});
