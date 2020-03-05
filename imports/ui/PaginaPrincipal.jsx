import React from 'react';
import { Meteor } from 'meteor/meteor';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';


export default class PaginaPrincipal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cedula: '',
            verEmpleados: false};
      };
    componentDidMount(){

    }
    inputField(event){
      this.setState({ cedula: event.target.value })
    }
    busqueda(){
      Meteor.call('readEmpleadoByCedula', {cedula: Number(this.state.cedula)}, (err, result)=>{
        if(err){
          console.log(err)
        }else{
          console.log(result)
        }
      })
    }
  render() {
    return (
      <div>
              <h4>Ingrese cedula</h4>
              <input onChange={(event)=> this.inputField(event) }  value={this.state.cedula} placeholder="Ingrese una cedula para buscar" type="number" />
              <button 
              disabled={!this.state.cedula}
              onClick={()=>this.busqueda()}
              >Buscar</button>
               <Link href="/ver_empleados" >
               <Button   color="primary">
                Ver empleados
              </Button>
              </Link>
              <Link href="/ver_clientes" >
               <Button   color="primary">
                Ver Clientes
              </Button>
              </Link>
      </div>

    );
  }
}