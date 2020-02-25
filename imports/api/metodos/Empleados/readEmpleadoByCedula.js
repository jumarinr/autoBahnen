import { ValidatedMethod } from 'meteor/mdg:validated-method';
import SimpleSchema from 'simpl-schema';
import { Promise } from 'meteor/promise';
import dataBaseConnection from '../../../../startup/dataBaseConnection';

export const readEmpleadoByCedula = new ValidatedMethod({
  name: 'readEmpleadoByCedula',
  validate:  new SimpleSchema({
        cedula: { type: Number },
    }).validator(),
  run({ cedula }) {
      /* SELECT * WHERE  cedula = "cedulaIngresadaPorElUsuario" FROM EMPLEADO; */
    const elementosEncontrados = Promise.await(
        dataBaseConnection.select().where('cedula', cedula).from('EMPLEADO').then(
            (respuesta)=>{
            const respuestaParseada= JSON.parse(JSON.stringify(respuesta));
            // console.log(respuestaParseada)
            return respuestaParseada
        }
    ).catch(
        (error)=>{
            console.log(error)
            throw new Error('error en la búsqueda', error)
        }
    ));
    return elementosEncontrados;
  }
});