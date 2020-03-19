import React from "react";
import { Meteor } from "meteor/meteor";
import Button from "@material-ui/core/Button";

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

export default class PaginaPrincipal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cedula: "",
      verEmpleados: false
    };
  }
  componentDidMount() {}
  render() {
    return (
      <div>
        <hr />

        <Grid
          container
          justify="center"
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Grid
                  container
                  justify="center"
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <Grid item xs={12}>
                    <h4>Entrega 2 de bases de datos 1</h4>
                  </Grid>
                  <Grid item xs={12}>
                    <span>
                      <b>Realizada por:</b>
                      <ul>
                        <li>Juan Diego Marín Rodríguez</li>
                        <li>Daniela Guardia Cuevo</li>
                        <li>Manuel Alejandro Escobar Mira</li>
                      </ul>
                    </span>
                  </Grid>
                  <Grid item xs={12}>
                    <span>
                      <b>Vistas de la pagina:</b>
                    </span>
                    <ul>
                      <li>
                        <a href="/ver_empleados">Ver empleados</a>
                      </li>

                      <li>
                        <a href="/ver_clientes">Ver Clientes</a>
                      </li>
                      <li>
                        <a href="/ver_sedes">Ver Sedes</a>
                      </li>
                      <li>
                        <a href="/agregar_empleado">Agregar empleado</a>
                      </li>
                      <li>
                        <a href="/agregar_cliente">Agregar cliente</a>
                      </li>
                      <li>
                        <a href="/registrar_venta">Registrar venta</a>
                      </li>
                      <li>
                        <a href="/ver_ventas">Ver ventas</a>
                      </li>
                      <li>
                        <a href="/agregar_sede">Agregar sede</a>
                      </li>
                    </ul>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}
