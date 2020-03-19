import { ValidatedMethod } from "meteor/mdg:validated-method";
import dataBaseConnection from "../../../../startup/dataBaseConnection";
import { Meteor } from "meteor/meteor";

export const readEmpleados = new ValidatedMethod({
  name: "readEmpleados",
  validate: () => {},
  run() {
    /* SELECT *,
        SEDE.nombre as nombreSede,
       (SELECT COUNT(*)
       FROM VENTA WHERE VENTA.empleadoCedula = EMPLEADO.cedula)
       as totalVentas
       FROM EMPLEADO;
       LEFT JOIN SEDE
       ON EMPLEADO.codigoSede=SEDE.codigo;
       */
    const elementosEncontrados = Promise.await(
      dataBaseConnection
        .select(
          dataBaseConnection.raw(
            "EMPLEADO.cedula, EMPLEADO.nombre_completo, EMPLEADO.telefono, EMPLEADO.salario_base, EMPLEADO.direccion, EMPLEADO.isAsesor, EMPLEADO.comision, EMPLEADO.codigoSede, SEDE.nombre as nombreSede, (SELECT COUNT(*) FROM VENTA WHERE VENTA.empleadoCedula = EMPLEADO.cedula) as totalVentas"
          )
        )
        .from(dataBaseConnection.raw("EMPLEADO"))
        .leftJoin("SEDE", "SEDE.codigo", "EMPLEADO.codigoSede")
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
