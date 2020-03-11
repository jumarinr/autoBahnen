import { ValidatedMethod } from 'meteor/mdg:validated-method';
import dataBaseConnection from '../../../../startup/dataBaseConnection';
import {Meteor} from 'meteor/meteor'

export const readVentas = new ValidatedMethod({
  name: 'readVentas',
  validate:  () => {},
  run() {
       /* SELECT codigo, fecha, EMPLEADO.nombre_completo as empleado, CLIENTE.nombre_completo as cliente 
       * FROM VENTA, CLIENTE, EMPLEADO
       WHERE EMPLEADO.cedula = VENTA.empleadoCedula and CLIENTE.cedula =Venta.clienteCedula;

        retorna todos los elementos de la tabla VENTA
       */
       const elementosEncontrados = Promise.await(
        dataBaseConnection.select(dataBaseConnection.raw('codigo, fecha, EMPLEADO.nombre_completo as empleado, CLIENTE.nombre_completo as cliente'))
        .from(dataBaseConnection.raw('VENTA, CLIENTE, EMPLEADO'))
        .whereRaw('EMPLEADO.cedula = VENTA.empleadoCedula and CLIENTE.cedula = VENTA.clienteCedula')
        .then(
            (respuesta)=>{
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