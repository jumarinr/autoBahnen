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
// import CloseIcon from '@material-ui/icons/Close';

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
            direccion: '',
            openError: false,
            msgError: '',
            openSuccess: false,
            msgSuccess: '',
        };
      };
    componentDidMount(){
    }
    changeValue(event, name){
        this.setState({[`${name}`]: event.target.value});
    }
    llenarDatos(event){
      if(!this.state.cedula){
        this.setState({openError: true, msgError: "Debe ingresar una cédula"})
        return false;
      }
      if(!this.state.nombre_completo){
        this.setState({openError: true, msgError: "Debe ingresar un nombre"})
        return false;
      }
      if(!this.state.telefono){
        this.setState({openError: true, msgError: "Debe seleccionar un teléfono"})
        return false; 
      }
      if(!this.state.salario_base){jandi
        this.setState({openError: true, msgError: "Debe seleccionar un salario base"})
        return false;
      }
      const data = {
        cedula : Number(this.state.cedula),
        nombre_completo: this.state.nombre_completo,
        telefono: Number(this.state.telefono),
        salario_base: Number(this.state.salario_base)
      }
      if (this.state.direccion){
        data.direccion = this.state.direccion;
      }
      Meteor.call('createEmpleados', data, (err, result)=>{
        if(err){
          console.log(err)
          this.setState({openError: true, msgError: err.error})
        }else{
          this.setState({openSuccess: true, msgSuccess: "Empleado creado con exito", 
          cedula: '',
          nombre_completo: '',
          telefono: '',
          salario_base: '',
          direccion: '',})
        }
      })
      
    }
  render() {
    return (
      <div>
                   
    <Link href="/" >
               <Button style={{color: '#335182'}}>
                Ir a inicio
              </Button>
              </Link>
              <Link href="/ver_empleados" >
               <Button style={{color: '#335182'}}>
                ver Empleados
              </Button>
              </Link>
        

          <Grid container>
              <Grid item xs={6}>
              <Card variant="outlined">
          <CardContent>
            <Grid container>
            <form onSubmit={event =>  this.llenarDatos(event) }>
                <Grid item xs={12}>
                <TextField id="cedula" required type="number" label="Ingrese cédula" 
                onChange={(event=>{this.changeValue(event, 'cedula')})} value={this.state.cedula}/>
                </Grid>
                <Grid item xs={12}>
                <TextField id="nombre_completo" required label="Ingrese nombre" 
                onChange={(event=>{this.changeValue(event, 'nombre_completo')})} value={this.state.nombre_completo}/>
                </Grid>
                <Grid item xs={12}>
                <TextField id="telefono" required label="Ingrese télefono" type="number"
                onChange={(event=>{this.changeValue(event, 'telefono')})} value={this.state.telefono}/>
                </Grid>
                <Grid item xs={12}>
                <TextField id="salario_base" required label="Ingrese salario base" type="number"
                onChange={(event=>{this.changeValue(event, 'salario_base')})} value={this.state.salario_base}/>
                </Grid>
                <Grid item xs={12}> 
                <TextField id="direccion"  label="Ingrese dirección" 
                onChange={(event=>{this.changeValue(event, 'direccion')})} value={this.state.direccion}/>
                </Grid>
                <Grid item xs={12}> 
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