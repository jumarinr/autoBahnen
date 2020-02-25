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

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


export default class TablaEmpleados extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            empleados: []};
      };
    componentDidMount(){
        Meteor.call('readEmpleados', (err, result)=>{
            if(err){
                console.log(err)
            }else{
                console.log(result)
                this.setState({empleados: result})
            }
        } )
    }
  render() {
    return (
      <div>
          <br/>
          <TableContainer style={{height : '70%', width: '60%'}} component={Paper}>
      <Table  size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Cedula</TableCell>
            <TableCell align="center">Nombre Completo</TableCell>
            <TableCell align="center">Telefono</TableCell>
            <TableCell align="center">Salario base</TableCell>
            <TableCell align="center">Dirección</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.empleados.map(row => (
            <TableRow key={row.cedula}>
              <TableCell align="center" component="th" scope="row">
                {row.cedula}
              </TableCell>
              <TableCell align="center">{row.nombre_completo}</TableCell>
              <TableCell align="center">{row.telefono}</TableCell>
              <TableCell align="center">{row.salario_base}</TableCell>
              <TableCell align="center">{row.direccion || '--'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <hr/>
    <Link href="/" >
               <Button   color="primary">
                Ir a inicio
              </Button>
              </Link>
              <Link href="/agregar_empleado" >
               <Button   color="primary">
                Agregar empleado
              </Button>
              </Link>
      </div>

    );
  }
}