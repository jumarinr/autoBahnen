import React from "react";
import App from "../App";
import TablaEmpleados from "../Empleados/TablaEmpleados";
import AgregarEmpleado from "../Empleados/AgregarEmpleado";
import AgregarCliente from "../Clientes/AgregarCliente";
import TablaClientes from "../Clientes/TablaClientes";
import { render } from "react-dom";
import { Switch } from "react-router";
import { BrowserRouter, Route } from "react-router-dom";
import RegistrarVenta from "../Ventas/RegistrarVenta";
import VerVentas from "../Ventas/VerVentas";
import VerSedes from "../Sedes/VerSedes";
import RegistrarSede from "../Sedes/RegistrarSede";
import EditVenta from "../Ventas/EditVenta";
import EditEmpleado from "../Empleados/EditEmpleado";

Meteor.startup(() => {
  render(
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/ver_empleados" component={TablaEmpleados} />
        <Route path="/agregar_empleado" component={AgregarEmpleado} />
        <Route path="/agregar_cliente" component={AgregarCliente} />
        <Route path="/ver_clientes" component={TablaClientes} />
        <Route path="/registrar_venta" component={RegistrarVenta} />
        <Route path="/ver_ventas" component={VerVentas} />
        <Route path="/ver_sedes" component={VerSedes} />
        <Route path="/agregar_sede" component={RegistrarSede} />
        <Route path="/editar_venta/:codigo" component={EditVenta} />
        <Route path="/editar_empleado/:cedula" component={EditEmpleado} />
        <Route path="*" component={App} />
      </Switch>
    </BrowserRouter>,
    document.getElementById("react-target")
  );
});
