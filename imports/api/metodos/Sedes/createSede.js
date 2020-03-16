import { ValidatedMethod } from 'meteor/mdg:validated-method';
import SimpleSchema from 'simpl-schema';
import { Promise } from 'meteor/promise';
import {Meteor} from 'meteor/meteor'
import dataBaseConnection from '../../../../startup/dataBaseConnection';

export const createSede = new ValidatedMethod({
  name: 'createSede',
  validate:  new SimpleSchema({
    codigo: { type: Number},
        nombre: { type: String},
        telefono: { type: Number },
        direccion: {type: String, optional: true },
        municipio: {type: String },
        email: {type: String, optional: true},
        gerenteCedula: { type: Number,}

    }).validator(),
  run({ ...data }) {

    if(data.isAsesor && !data.comision){
      throw new Meteor.Error('Debe seleccionar una comisión')
    }
    /*
      SELECT * WHERE cedula: ${data.cedula} FROM EMPLEADO; 
    */
    const codigoRepetido = Promise.await(
      dataBaseConnection.select().where('codigo', data.codigo).from('SEDE').then(
          (respuesta)=>{
          const respuestaParseada= JSON.parse(JSON.stringify(respuesta));
          return respuestaParseada
      }
  ).catch(
      (error)=>{
          console.log(error)
      }
  ));
  if(codigoRepetido && codigoRepetido.length > 0 ){
    throw new Meteor.Error('La cedula ya esta registrada en base de datos')
 }

 const cedulaGerente = Promise.await(
    dataBaseConnection.select().where('cedula', data.gerenteCedula).from('EMPLEADO').then(
        (respuesta)=>{
        const respuestaParseada= JSON.parse(JSON.stringify(respuesta));
        return respuestaParseada
    }
).catch(
    (error)=>{
        console.log(error)
    }
));
if(!cedulaGerente || cedulaGerente.length === 0 ){
  throw new Meteor.Error('No se encontró la cedula del vendedor')
}
    /* 
       'insert into `EMPLEADO` (`cedula`, `nombre_completo`, `salario_base`, `telefono`) values (cedula, \'nombre\', telefono, salario)' 
    */
    const resultado = Promise.await(
      dataBaseConnection('SEDE').
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