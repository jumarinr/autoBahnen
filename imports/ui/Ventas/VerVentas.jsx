import React from 'react';
import { Meteor } from 'meteor/meteor';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from  '@material-ui/core/SnackbarContent';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Header from '../Header/Header'
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import moment from 'moment';
import 'moment/locale/es' 

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


export default class VerVentas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clientes: [],
            loading: true,
            openError: false,
            msgError: '',
            errorF: false,
            noData: false,
          };
      };
    componentDidMount(){
        Meteor.call('readVentas', (err, result)=>{
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
  render() {
    return (
      <div>
        <Header props={'verVentas'}/>
           
              <hr/>
   
      <TableContainer style={{height : '70%', width: '60%'}} component={Paper}>
      {this.state.loading ? 
      (
        <React.Fragment>
           <Card variant="outlined">
             <CardContent>
               <div style={{color: '#335182', textAlign: 'center'}}>
            Cargando la información de las ventas...
          <br/>
          <br/>
        <LinearProgress />
        </div>
               </CardContent>  
        </Card>
        </React.Fragment>
    
      )   
      : (this.state.errorF ? (
        <React.Fragment>
           <Card variant="outlined">
             <CardContent>
             {this.state.noData ?
             (<h4 style={{textAlign : 'center'}}>No hay elementos guardados en la tabla clientes.</h4>)
             :
               <h4 style={{color: 'red', textAlign: 'center'}}>
               <IconButton aria-label="problem">
               <ReportProblemIcon style={{fontSize: '50px', color: 'red'}}/>
               </IconButton>
               {this.state.msgError}
             </h4> }
               </CardContent>  
        </Card>
        </React.Fragment>
      )
       :
      <Table  size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Codigo</TableCell>
            <TableCell align="center">Fecha</TableCell>
            <TableCell align="center">Empleado</TableCell>
            <TableCell align="center">Cliente</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.clientes.map(row =>{ 
              let fecha = moment(row.fecha);
              fecha = fecha.locale('es')
              fecha = fecha.format('dddd, MMMM Do YYYY')
              return (
            <TableRow key={row.codigo}>
              <TableCell align="center" component="th" scope="row">
                {row.codigo}
              </TableCell>
              <TableCell style={{textTransform: 'capitalize'}} align="center">{fecha}</TableCell>
              <TableCell align="center">{row.empleado || '--'}</TableCell>
              <TableCell align="center">{row.cliente || '--'}</TableCell>
            </TableRow>
          )})}
        </TableBody>
      </Table>)}
          </TableContainer> 
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
      </div>

    );
  }
}