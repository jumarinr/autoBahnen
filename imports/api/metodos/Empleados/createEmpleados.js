import { ValidatedMethod } from 'meteor/mdg:validated-method';
import SimpleSchema from 'simpl-schema';

export const createEmpleados = new ValidatedMethod({
  name: 'createEmpleados',
  validate:  new SimpleSchema({
        nombre: { type: String },
        cedula: { type: Number},
        nombre_completo: { type: String},
        telefono: { type: Number },
        salario_base: {type: Number},
        direccion_residencia: {type: String, optional: true }

    }).validator(),
  run({ ...data }) {
    console.log(data)

    return data;
  }
});