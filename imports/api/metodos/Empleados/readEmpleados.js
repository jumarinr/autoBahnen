import { ValidatedMethod } from 'meteor/mdg:validated-method';
import dataBaseConnection from '../../../../startup/dataBaseConnection';
import {Meteor} from 'meteor/meteor'

export const readEmpleados = new ValidatedMethod({
  name: 'readEmpleados',
  validate:  () => {},
  run() {
       /* SELECT *, 
       (SELECT COUNT(*) 
       FROM VENTA WHERE VENTA.empleadoCedula = EMPLEADO.cedula) 
       as totalVentas 
       FROM EMPLEADO;
        retorna todos los elementos de la tabla EMPLEADO
       */
       const elementosEncontrados = Promise.await(
        dataBaseConnection.select(dataBaseConnection.raw('*, (SELECT COUNT(*) FROM VENTA WHERE VENTA.empleadoCedula = EMPLEADO.cedula) as totalVentas')).from('EMPLEADO').then(
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