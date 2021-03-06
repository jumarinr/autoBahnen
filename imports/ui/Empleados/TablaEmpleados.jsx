import React from "react";
import { Meteor } from "meteor/meteor";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Header from "../Header/Header";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import ReportProblemIcon from "@material-ui/icons/ReportProblem";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

export default class TablaEmpleados extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      empleados: [],
      loading: true,
      openError: false,
      msgError: "",
      errorF: false
    };
  }
  componentDidMount() {
    Meteor.call("readEmpleados", (err, result) => {
      if (err) {
        console.log(err),
          this.setState({
            loading: false,
            openError: true,
            msgError: err.error,
            errorF: true
          });
      } else {
        console.log(result);
        this.setState({
          empleados: result,
          loading: false,
          errorF: !!(result.length === 0),
          msgError:
            result.length === 0
              ? "No hay registros de empleados en la base de datos"
              : null
        });
      }
    });
  }
  render() {
    return (
      <div>
        <Header props={"TablaEmpleados"} />

        <hr />

        <Grid
          container
          justify="center"
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Grid item xs={12} md={12}>
            <TableContainer
              style={{ height: "100%", width: "100%" }}
              component={Paper}
            >
              {this.state.loading ? (
                <React.Fragment>
                  <Card variant="outlined">
                    <CardContent>
                      <div style={{ color: "#335182", textAlign: "center" }}>
                        Cargando la información de los empleados...
                        <br />
                        <br />
                        <LinearProgress />
                      </div>
                    </CardContent>
                  </Card>
                </React.Fragment>
              ) : this.state.errorF ? (
                <React.Fragment>
                  <Card variant="outlined">
                    <CardContent>
                      <h4 style={{ color: "red", textAlign: "center" }}>
                        <IconButton aria-label="problem">
                          <ReportProblemIcon
                            style={{ fontSize: "50px", color: "red" }}
                          />
                        </IconButton>
                        {this.state.msgError}
                      </h4>
                    </CardContent>
                  </Card>
                </React.Fragment>
              ) : (
                <Table size="small" aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Cédula</TableCell>
                      <TableCell align="center">Nombre Completo</TableCell>
                      <TableCell align="center">Teléfono</TableCell>
                      <TableCell align="center">Salario base</TableCell>
                      <TableCell align="center">Dirección</TableCell>
                      <TableCell align="center">Tipo de empleado</TableCell>
                      <TableCell align="center">Comisión</TableCell>
                      <TableCell align="center">Total de ventas</TableCell>
                      <TableCell align="center">Sede asesor</TableCell>
                      <TableCell align="center">Editar</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.empleados.map(row => (
                      <TableRow key={row.cedula}>
                        <TableCell align="center" component="th" scope="row">
                          {row.cedula}
                        </TableCell>
                        <TableCell align="center">
                          {row.nombre_completo}
                        </TableCell>
                        <TableCell align="center">{row.telefono}</TableCell>
                        <TableCell align="center">{row.salario_base}</TableCell>
                        <TableCell align="center">
                          {row.direccion || "--"}
                        </TableCell>
                        <TableCell align="center">
                          {row.isAsesor ? "Asesor" : "Gerente"}
                        </TableCell>
                        <TableCell align="center">
                          {row.comision || "--"}
                        </TableCell>
                        <TableCell align="center">
                          {row.totalVentas || "--"}
                        </TableCell>
                        <TableCell align="center">
                          {row.nombreSede || "--"}
                        </TableCell>

                        <TableCell align="center">
                          <Link href={`editar_empleado/${row.cedula}`}>
                            <IconButton>
                              {" "}
                              <EditOutlinedIcon
                                style={{ color: "#335182" }}
                              />{" "}
                            </IconButton>{" "}
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </TableContainer>
          </Grid>
        </Grid>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={this.state.openError}
          autoHideDuration={6000}
          onClose={() => this.setState({ openError: false })}
        >
          <SnackbarContent
            style={{
              backgroundColor: "red"
            }}
            message={this.state.msgError}
            action={[
              <IconButton
                key={1}
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() => this.setState({ openError: false })}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            ]}
          />
        </Snackbar>
      </div>
    );
  }
}
