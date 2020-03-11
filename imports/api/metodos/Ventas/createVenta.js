import { ValidatedMethod } from 'meteor/mdg:validated-method';
import SimpleSchema from 'simpl-schema';
import { Promise } from 'meteor/promise';
import {Meteor} from 'meteor/meteor'
import dataBaseConnection from '../../../../startup/dataBaseConnection';

export const createVenta = new ValidatedMethod({
  name: 'createVenta',
  validate:  new SimpleSchema({
        codigo: { type: Number},
        fecha: {type :Date}, 
        clienteCedula: { type: Number },
        empleadoCedula: { type: Number },

    }).validator(),
  run({ ...data }) {

    /*
      SELECT * WHERE cedula: ${data.cedula} FROM EMPLEADO; 
    */
    const ventaRepetida = Promise.await(
      dataBaseConnection.select().where('codigo', data.codigo).from('VENTA').then(
          (respuesta)=>{
          const respuestaParseada= JSON.parse(JSON.stringify(respuesta));
          return respuestaParseada
      }
  ).catch(
      (error)=>{
          console.log(error)
      }
  ));
  if(ventaRepetida && ventaRepetida.length > 0 ){
    throw new Meteor.Error('Este código de venta ya esta registrado')
 }
 const cedulaVendedor = Promise.await(
    dataBaseConnection.select().where('cedula', data.empleadoCedula).from('EMPLEADO').then(
        (respuesta)=>{
        const respuestaParseada= JSON.parse(JSON.stringify(respuesta));
        return respuestaParseada
    }
).catch(
    (error)=>{
        console.log(error)
    }
));
if(!cedulaVendedor || cedulaVendedor.length === 0 ){
  throw new Meteor.Error('No se encontró la cedula del vendedor')
}
console.log(data.clienteCedula)
const cedulaCliente = Promise.await(
    dataBaseConnection.select().where('cedula', data.clienteCedula).from('CLIENTE').then(
        (respuesta)=>{
        const respuestaParseada= JSON.parse(JSON.stringify(respuesta));
        return respuestaParseada
    }
).catch(
    (error)=>{
        console.log(error)
    }
));
console.log(data.clienteCedula)
if(!cedulaCliente || cedulaCliente.length === 0 ){
  throw new Meteor.Error('No se encontró la cedula del cliente')
}

    /* 
       'insert into `EMPLEADO` (`cedula`, `nombre_completo`, `salario_base`, `telefono`) values (cedula, \'nombre\', telefono, salario)' 
    */
    const resultado = Promise.await(
      dataBaseConnection('VENTA').
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