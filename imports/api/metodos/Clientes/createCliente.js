import { ValidatedMethod } from 'meteor/mdg:validated-method';
import SimpleSchema from 'simpl-schema';
import { Promise } from 'meteor/promise';
import {Meteor} from 'meteor/meteor'
import dataBaseConnection from '../../../../startup/dataBaseConnection';

export const createCliente = new ValidatedMethod({
  name: 'createCliente',
  validate:  new SimpleSchema({
        cedula: { type: Number},
        nombre_completo: { type: String},
        telefono: { type: Number },
        dirección_residencia: {type: String, optional: true },
        email: {type: String, optional: true }

    }).validator(),
  run({ ...data }) {
    /*
      SELECT * WHERE cedula: ${data.cedula} FROM CLIENTE; 
    */
    const cedulaRepetida = Promise.await(
      dataBaseConnection.select().where('cedula', data.cedula).from('CLIENTE').then(
          (respuesta)=>{
          const respuestaParseada= JSON.parse(JSON.stringify(respuesta));
          return respuestaParseada
      }
  ).catch(
      (error)=>{
          console.log(error)
      }
  ));
  if(cedulaRepetida && cedulaRepetida.length > 0 ){
    throw new Meteor.Error('La cedula ya esta registrada en base de datos')
 }

    /* 
       'insert into `CLIENTE` (`cedula`, `nombre_completo`, `salario_base`, `telefono`) values (cedula, \'nombre\', telefono, salario)' 
    */
    const resultado = Promise.await(
      dataBaseConnection('CLIENTE').
      insert(data).
      then(resultado=>{return resultado}).
      catch(
        error=>{
          console.log(error)
          throw new Meteor.Error(`Error al crear el cliente: ${error.sqlMessage}`)
        }));

    return resultado;
  }
});