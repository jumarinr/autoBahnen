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
import CardActions from '@material-ui/core/CardActions';
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


export default class RegistrarVenta extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            codigo: '',
            fecha: '',
            clienteCedula: '',
            empleadoCedula: '',
            direccion: '',
            openError: false,
            msgError: '',
            openSuccess: false,
            msgSuccess: '',
            isAsesor: true,
            comision: '',
            empleados: [],
            clientes: []
        };
      };
    componentDidMount(){
      Meteor.call('readAsesores', (err, result)=>{
        if(err){
            console.log(err),
            this.setState({loading: false, openError: true, msgError: err.error, errorF: true})
        }else{
            console.log(result)
            this.setState({empleados: result, 
             loading: false,
             errorF:!! (result.length === 0),
             msgError: result.length === 0 ? 'No hay registros de empleados en la base de datos' : null,
            })
        }
    } )

    Meteor.call('readClientes', (err, result)=>{
      if(err){
          console.log(err),
          this.setState({loading: false, openError: true, msgError: err.error, errorF: true})
      }else{
          console.log(result)
          this.setState({clientes: result, 
           loading: false,
           errorF: !! (result.length === 0),
           noData: !! (result.length === 0),
          })
      }
  } )
    }
    changeValue(event, name){
        this.setState({[`${name}`]: event.target.value});
    }
    llenarDatos(event){
      if(!this.state.codigo){
        this.setState({openError: true, msgError: "Debe ingresar una código de venta"})
        return false;
      }
      if(!this.state.clienteCedula){
        this.setState({openError: true, msgError: "Debe seleccionar la cedula del cliente"})
        return false; 
      }
      if(!this.state.empleadoCedula){
        this.setState({openError: true, msgError: "Debe seleccionar la cedula del vendedor"})
        return false;
      }
      const data = {
        codigo : Number(this.state.codigo),
        fecha: new Date(),
        clienteCedula: Number(this.state.clienteCedula),
        empleadoCedula: Number(this.state.empleadoCedula),
      }

      Meteor.call('createVenta', data, (err, result)=>{
        if(err){
          console.log(err)
          this.setState({openError: true, msgError: err.error})
        }else{
          this.setState({openSuccess: true, msgSuccess: "Venta creada con exito", 
          codigo: '',
          fecha: '',
          clienteCedula: '',
          empleadoCedula: '',
        })
        }
      })
      
    }
  render() {
    return (
      <div>
        <Header props={'registrarVenta'}/>
        <hr/>
        <Grid container
  direction="row"
  justify="center"
  alignItems="center">
              <Grid item xs={12} md={4}>
              <Card variant="outlined">
          <CardContent>
          <Grid container
  direction="row"
  justify="center"
  alignItems="center">
              <div >
                <Grid item xs={12}>
                  <h5>
                    Complete la información para registrar la venta
                  </h5>
                </Grid>
            <form onSubmit={event =>  this.llenarDatos(event) }>
                <Grid item xs={12}>
                <TextField id="codigo" fullWidth={true} required type="number" label="Ingrese código" 
                onChange={(event=>{this.changeValue(event, 'codigo')})} value={this.state.codigo}/>
                </Grid>
                <br/>
                <Grid item xs={12}>

                <InputLabel htmlFor="cliente">Empleado</InputLabel>
        <Select
          value={this.state.empleadoCedula}
          onChange={(event)=> this.setState({empleadoCedula: event.target.value})}
          inputProps={{
            name: 'Cliente',
            fullWidth: true,
            id: 'cliente',
          }}
        >
          {this.state.empleados.map((empleado)=>
            <MenuItem value={empleado.cedula}>{empleado.nombre_completo}</MenuItem>  
          )}
          
        </Select>
                </Grid>
                <br/>
                <Grid item xs={12}>

                <InputLabel htmlFor="cliente">Cliente</InputLabel>
        <Select
          value={this.state.clienteCedula}
          onChange={(event)=> this.setState({clienteCedula: event.target.value})}
          inputProps={{
            name: 'Cliente',
            fullWidth: true,
            id: 'cliente',
          }}
        >
          {this.state.clientes.map((client)=>
            <MenuItem value={client.cedula}>{client.nombre_completo}</MenuItem>  
          )}
          
        </Select>
                </Grid>
             
                </form>
                </div> 
              </Grid> 
              </CardContent>
              <CardActions>
                <Grid
  container
  direction="row"
  justify="flex-end"
  alignItems="center"
>
              <Grid>
                <Button  style={{color: '#335182'}} onClick={()=>this.llenarDatos()}>
                Registrar
              </Button>
                </Grid>
                </Grid>
              </CardActions>
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