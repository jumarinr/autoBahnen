import React from 'react';
import { Meteor } from 'meteor/meteor';

export default class PaginaPrincipal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cedula: ''};
      };
    componentDidMount(){
        Meteor.call('readEmpleados', {textoPrueba: 'Texto de prueba'}, (err, result)=>{
            if(err){
                console.log(err)
            }else{
                console.log(result)
            }
        } )
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
      </div>

    );
  }
}