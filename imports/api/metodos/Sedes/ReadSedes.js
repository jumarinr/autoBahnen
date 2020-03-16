import { ValidatedMethod } from 'meteor/mdg:validated-method';
import dataBaseConnection from '../../../../startup/dataBaseConnection';
import {Meteor} from 'meteor/meteor'

export const ReadSedes = new ValidatedMethod({
  name: 'ReadSedes',
  validate:  () => {},
  run() {
       /* SELECT codigo, nombre, direccion, municipio, telefono, email , EMPLEADO.nombre_completo as gerente
       * FROM SEDE, CLIENTE
       WHERE EMPLEADO.cedula = SEDE.empleadoCedula;

        retorna todos los elementos de la tabla VENTA
       */
       const elementosEncontrados = Promise.await(
        dataBaseConnection.select(dataBaseConnection.raw('codigo, nombre, SEDE.direccion as direccion, municipio, SEDE.telefono as telefono, SEDE.email as email, EMPLEADO.nombre_completo as gerente'))
        .from(dataBaseConnection.raw('SEDE, EMPLEADO'))
        .whereRaw('EMPLEADO.cedula = SEDE.gerenteCedula')
        .then(
            (respuesta)=>{
                console.log(respuesta)
            const respuestaParseada= JSON.parse(JSON.stringify(respuesta));
            return respuestaParseada
        }
    ).catch(
        (error)=>{
            console.log(error)
            throw new Meteor.Error(`Error en la búsqueda: ${error.sqlMessage}`)
        }
    ));
    console.log(elementosEncontrados)
    return elementosEncontrados;
  }
});