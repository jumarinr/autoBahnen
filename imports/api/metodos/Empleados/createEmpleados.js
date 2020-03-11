import { ValidatedMethod } from 'meteor/mdg:validated-method';
import SimpleSchema from 'simpl-schema';
import { Promise } from 'meteor/promise';
import {Meteor} from 'meteor/meteor'
import dataBaseConnection from '../../../../startup/dataBaseConnection';

export const createEmpleados = new ValidatedMethod({
  name: 'createEmpleados',
  validate:  new SimpleSchema({
        cedula: { type: Number},
        nombre_completo: { type: String},
        telefono: { type: Number },
        salario_base: {type: Number},
        direccion: {type: String, optional: true },
        isAsesor: {type: Boolean },
        comision: {type: Number, optional: true}

    }).validator(),
  run({ ...data }) {

    if(data.isAsesor && !data.comision){
      throw new Meteor.Error('Debe seleccionar una comisión')
    }
    /*
      SELECT * WHERE cedula: ${data.cedula} FROM EMPLEADO; 
    */
    const cedulaRepetida = Promise.await(
      dataBaseConnection.select().where('cedula', data.cedula).from('EMPLEADO').then(
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
       'insert into `EMPLEADO` (`cedula`, `nombre_completo`, `salario_base`, `telefono`) values (cedula, \'nombre\', telefono, salario)' 
    */
    const resultado = Promise.await(
      dataBaseConnection('EMPLEADO').
      insert(data).
      then(resultado=>{return resultado}).
      catch(
        error=>{
          console.log(error)
          throw new Meteor.Error(`Error al crear el empleado, ${error.sqlMessage}`)
        }));

    return resultado;
  }
});