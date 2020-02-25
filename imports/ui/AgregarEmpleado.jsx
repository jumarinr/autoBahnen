import React from 'react';
import { Meteor } from 'meteor/meteor';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


export default class AgregarEmpleado extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cedula: '',
            nombre_completo: '',
            telefono: '',
            salario_base: '',
            direccion: ''
        };
      };
    componentDidMount(){
    }
    changeValue(event, name){
        this.setState({[`${name}`]: event.target.value});
    }
  render() {
    return (
      <div>
          <Grid container>
              <Grid item xs={4}>
            <Grid container>
                <Grid item xs={12}>
                <TextField id="cedula" type="number" label="Ingresa cedula" 
                onChange={(event=>{this.changeValue(event, 'cedula')})} value={this.state.cedula}/>
                </Grid>
                <Grid item xs={12}>
                <TextField id="nombre_completo" label="Ingrese nombre" 
                onChange={(event=>{this.changeValue(event, 'nombre_completo')})} value={this.state.nombre_completo}/>
                </Grid>
                <Grid item xs={12}>
                <TextField id="telefono" label="Ingrese telefono" type="number"
                onChange={(event=>{this.changeValue(event, 'telefono')})} value={this.state.telefono}/>
                </Grid>
                <Grid item xs={12}>
                <TextField id="salario_base" label="Ingrese salario base" type="number"
                onChange={(event=>{this.changeValue(event, 'salario_base')})} value={this.state.salario_base}/>
                </Grid>
                <Grid item xs={12}> 
                <TextField id="direccion" label="Ingrese dirección" 
                onChange={(event=>{this.changeValue(event, 'direccion')})} value={this.state.direccion}/>
                </Grid>
              </Grid> 
              </Grid>
              </Grid>
      </div>

    );
  }
}