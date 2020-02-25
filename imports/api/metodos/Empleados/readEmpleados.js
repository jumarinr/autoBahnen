import { ValidatedMethod } from 'meteor/mdg:validated-method';
import SimpleSchema from 'simpl-schema';

export const readEmpleados = new ValidatedMethod({
  name: 'readEmpleados',
  validate:  new SimpleSchema({
        textoPrueba: { type: String },
    }).validator(),
  run({ textoPrueba }) {
    console.log(textoPrueba)
  }
});