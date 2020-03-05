import { ValidatedMethod } from 'meteor/mdg:validated-method';
import dataBaseConnection from '../../../../startup/dataBaseConnection';
import {Meteor} from 'meteor/meteor'

export const readClientes = new ValidatedMethod({
  name: 'readClientes',
  validate:  () => {},
  run() {
       /* SELECT * FROM CLIENTE; 
        retorna todos los elementos de la tabla CLIENTE
       */
       const elementosEncontrados = Promise.await(
        dataBaseConnection.select().from('CLIENTE').then(
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
    return elementosEncontrados;
  }
});