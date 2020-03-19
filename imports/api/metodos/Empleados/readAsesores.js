import { ValidatedMethod } from "meteor/mdg:validated-method";
import dataBaseConnection from "../../../../startup/dataBaseConnection";
import { Meteor } from "meteor/meteor";

export const readAsesores = new ValidatedMethod({
  name: "readAsesores",
  validate: () => {},
  run() {
    /* SELECT * FROM EMPLEADO WHERE isAsesor = true;
        retorna todos los elementos de la tabla EMPLEADO que tengan isAsesor en true
       */
    const elementosEncontrados = Promise.await(
      dataBaseConnection
        .select()
        .from("EMPLEADO")
        .where("isAsesor", true)
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
