import React from 'react'
import App from '../App'
import TablaEmpleados from '../Empleados/TablaEmpleados'
import AgregarEmpleado from '../Empleados/AgregarEmpleado'
import AgregarCliente from '../Clientes/AgregarCliente'
import TablaClientes from '../Clientes/TablaClientes';
import { render } from 'react-dom';
import { Switch } from 'react-router'
import { BrowserRouter, Route } from 'react-router-dom'

Meteor.startup(() => {
    render(
    <BrowserRouter >
    <Switch>
    <Route exact path="/" component={App}/>
        <Route path="/ver_empleados" component={TablaEmpleados}/>
        <Route path="/agregar_empleado" component={AgregarEmpleado}/>
        <Route path='/agregar_cliente' component={AgregarCliente}/>
        <Route path='/ver_clientes' component={TablaClientes}/>
    </Switch>
    </BrowserRouter>, 
    document.getElementById('react-target'));
  });
  