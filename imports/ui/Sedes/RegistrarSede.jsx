import React from 'react';
import { Meteor } from 'meteor/meteor';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from  '@material-ui/core/SnackbarContent';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Header from '../Header/Header'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';


// import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


export default class RegistrarSede extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            codigo: '',
            nombre: '',
            telefono: '',
            direccion: '',
            email: '',
            openError: false,
            msgError: '',
            openSuccess: false,
            msgSuccess: '',
            gerentes: [],
        };
      };
    componentDidMount(){
        Meteor.call('readGerentes', (err, result)=>{
            if(err){
                console.log(err),
                this.setState({loading: false, openError: true, msgError: err.error, errorF: true})
            }else{
                console.log(result)
                this.setState({gerentes: result, 
                 loading: false,
                 errorF:!! (result.length === 0),
                 msgError: result.length === 0 ? 'No hay registros de empleados en la base de datos' : null,
                })
            }
        } )
    }
    changeValue(event, name){
        this.setState({[`${name}`]: event.target.value});
    }
    llenarDatos(event){
      if(!this.state.codigo){
        this.setState({openError: true, msgError: "Debe ingresar una cédula"})
        return false;
      }
      if(!this.state.nombre){
        this.setState({openError: true, msgError: "Debe ingresar un nombre"})
        return false;
      }
      if(!this.state.telefono){
        this.setState({openError: true, msgError: "Debe seleccionar un teléfono"})
        return false; 
      }
      const data = {
        codigo : Number(this.state.codigo),
        nombre: this.state.nombre,
        telefono: Number(this.state.telefono),
        municipio: this.state.municipio,
        gerenteCedula: this.state.gerenteCedula,

      }
      if (this.state.direccion){
        data.direccion = this.state.direccion;
      }
      if (this.state.email){
        data.email = this.state.email;
      }
      Meteor.call('createSede', data, (err, result)=>{
        if(err){
          console.log(err)
          this.setState({openError: true, msgError: err.error})
        }else{
          this.setState({openSuccess: true, msgSuccess: "Sede creada con exito", 
          codigo: '',
          nombre: '',
          telefono: '',
          direccion: '',
          email: '',
        })
        }
      })
      
    }
  render() {
    return (
      <div>
        <Header props={'agregarCliente'} />
        
        <hr/>
          <Grid container>
              <Grid item xs={6}>
              <Card variant="outlined">
          <CardContent>
            <Grid container>
                <Grid item xs={12}>
                    <h5>Complete la información de la sede</h5>
                </Grid>
            <form onSubmit={event =>  this.llenarDatos(event) }>
                <Grid item xs={12}>
                <TextField id="codigo" required type="number" label="Ingrese código de sede" 
                onChange={(event=>{this.changeValue(event, 'codigo')})} value={this.state.codigo}/>
                </Grid>
                <Grid item xs={12}>
                <TextField id="nombre" required label="Ingrese nombre de sede" 
                onChange={(event=>{this.changeValue(event, 'nombre')})} value={this.state.nombre}/>
                </Grid>
                <Grid item xs={12}>
                <TextField id="telefono" required label="Ingrese télefono" type="number"
                onChange={(event=>{this.changeValue(event, 'telefono')})} value={this.state.telefono}/>
                </Grid>
                <Grid item xs={12}> 
                <TextField id="direccion"  label="Ingrese dirección" 
                onChange={(event=>{this.changeValue(event, 'direccion')})} value={this.state.direccion}/>
                </Grid>
                <Grid item xs={12}>
                <TextField id="municipio"  label="Ingrese municipio" 
                onChange={(event=>{this.changeValue(event, 'municipio')})} value={this.state.municipio}/>
                </Grid>
                <Grid item xs={12}>
                <TextField id="email" type="email" required label="Ingrese email" 
                onChange={(event=>{this.changeValue(event, 'email')})} value={this.state.email}/>
                </Grid>
                <Grid item xs={12}> 
                <br/>
                <Grid item xs={12}>

<InputLabel htmlFor="gerente">Gerente</InputLabel>
<Select
value={this.state.gerenteCedula}
onChange={(event)=> this.setState({gerenteCedula: event.target.value})}
inputProps={{
name: 'Gerente',
fullWidth: true,
id: 'gerente',
}}
>
{this.state.gerentes.map((gerente)=>
<MenuItem value={gerente.cedula}>{gerente.nombre_completo}</MenuItem>  
)}

</Select>
</Grid>
                <br/>
                <div style={{textAlign: 'right'}}>
                <Button  style={{color: '#335182'}} onClick={()=>this.llenarDatos()}>
                Registrar
              </Button>
                </div>
                
              </Grid> 
                </form>
              </Grid> 
              </CardContent>
              </Card>
              </Grid>
              </Grid>
             

              <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={this.state.openError}
        autoHideDuration={6000}
        onClose={()=>this.setState({openError: false})}
        >
          <SnackbarContent style={{
      backgroundColor:'red',
          }}
      message={
    this.state.msgError
      }
      action={[        <IconButton key={1}size="small" aria-label="close" color="inherit" onClick={()=>this.setState({openError: false})}>
      <CloseIcon fontSize="small" />
    </IconButton>]}
      />
        </Snackbar>
              
        <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={this.state.openSuccess}
        autoHideDuration={6000}
        onClose={()=>this.setState({openSuccess: false})}
        >
          <SnackbarContent style={{
      backgroundColor:'green',
          }}
      message={
    this.state.msgSuccess
      }
      action={[        <IconButton key={1}size="small" aria-label="close" color="inherit" onClick={()=>this.setState({openSuccess: false})}>
      <CloseIcon fontSize="small" />
    </IconButton>]}
      />
        </Snackbar>
      </div>

    );
  }
}