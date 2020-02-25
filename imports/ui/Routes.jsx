import React from 'react'
import App from './App'
import TablaEmpleados from './TablaEmpleados'
import AgregarEmpleado from './AgregarEmpleado'
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
    </Switch>
    </BrowserRouter>, 
    document.getElementById('react-target'));
  });
  