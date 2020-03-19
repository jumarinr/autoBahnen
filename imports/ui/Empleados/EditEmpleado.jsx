import React from "react";
import { Meteor } from "meteor/meteor";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Header from "../Header/Header";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

// import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

export default class EditEmpleado extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cedula: "",
      nombre_completo: "",
      telefono: "",
      salario_base: "",
      direccion: "",
      openError: false,
      msgError: "",
      openSuccess: false,
      msgSuccess: "",
      isAsesor: true,
      comision: "",
      sedes: [],
      codigoSede: null,
      editEmpleado: false
    };
  }
  componentDidMount() {
    Meteor.call("ReadSedes", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        this.setState({ sedes: result });
      }
    });
    Meteor.call(
      "readEmpleadoByCedula",
      { cedula: Number(this.props.match.params.cedula) },
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          this.setState({
            cedulaAntigua: result.cedula,
            cedula: result.cedula,
            nombre_completo: result.nombre_completo,
            telefono: result.telefono,
            salario_base: result.salario_base,
            direccion: result.direccion,
            openError: false,
            isAsesor: !!result.isAsesor,
            comision: result.comision,
            codigoSede: result.codigoSede
          });
        }
      }
    );
  }
  changeValue(event, name) {
    this.setState({ [`${name}`]: event.target.value });
  }
  llenarDatos(event) {
    if (!this.state.cedula) {
      this.setState({ openError: true, msgError: "Debe ingresar una cédula" });
      return false;
    }
    if (!this.state.nombre_completo) {
      this.setState({ openError: true, msgError: "Debe ingresar un nombre" });
      return false;
    }
    if (!this.state.telefono) {
      this.setState({
        openError: true,
        msgError: "Debe seleccionar un teléfono"
      });
      return false;
    }
    if (!this.state.salario_base) {
      this.setState({
        openError: true,
        msgError: "Debe seleccionar un salario base"
      });
      return false;
    }
    if (this.state.isAsesor && !this.state.comision) {
      this.setState({
        openError: true,
        msgError:
          "Debe seleccionar una comisión para un empleado de tipo asesor"
      });
      return false;
    }
    if (this.state.isAsesor && !this.state.codigoSede) {
      this.setState({
        openError: true,
        msgError: "Debe seleccionar una sede del asesor"
      });
      return false;
    }
    const data = {
      cedulaAntigua: Number(this.state.cedulaAntigua),
      cedula: Number(this.state.cedula),
      nombre_completo: this.state.nombre_completo,
      telefono: Number(this.state.telefono),
      salario_base: Number(this.state.salario_base),
      isAsesor: this.state.isAsesor
    };
    if (this.state.direccion) {
      data.direccion = this.state.direccion;
    }
    if (this.state.isAsesor) {
      data.comision = Number(this.state.comision);
      data.codigoSede = Number(this.state.codigoSede);
    }
    Meteor.call("editEmpleado", data, (err, result) => {
      if (err) {
        console.log(err);
        this.setState({ openError: true, msgError: err.error });
      } else {
        this.setState({
          openSuccess: true,
          msgSuccess: "Empleado editado con exito",
          editEmpleado: true
        });
      }
    });
  }
  render() {
    const { editEmpleado } = this.state;
    return (
      <div>
        <Header props={"agregaEmpleados"} />
        <hr />
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={12} md={4}>
            <Card variant="outlined">
              <CardContent>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <div>
                    <Grid item xs={12}>
                      <h6>Edite la información del empleado</h6>
                    </Grid>
                    <form onSubmit={event => this.llenarDatos(event)}>
                      <Grid item xs={12}>
                        <TextField
                          id="cedula"
                          fullWidth={true}
                          required
                          disabled={editEmpleado}
                          type="number"
                          label="Ingrese cédula"
                          onChange={event => {
                            this.changeValue(event, "cedula");
                          }}
                          value={this.state.cedula}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          id="nombre_completo"
                          fullWidth={true}
                          required
                          disabled={editEmpleado}
                          label="Ingrese nombre"
                          onChange={event => {
                            this.changeValue(event, "nombre_completo");
                          }}
                          value={this.state.nombre_completo}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          id="telefono"
                          fullWidth={true}
                          required
                          disabled={editEmpleado}
                          label="Ingrese télefono"
                          type="number"
                          onChange={event => {
                            this.changeValue(event, "telefono");
                          }}
                          value={this.state.telefono}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          id="salario_base"
                          fullWidth={true}
                          disabled={editEmpleado}
                          required
                          label="Ingrese salario base"
                          type="number"
                          onChange={event => {
                            this.changeValue(event, "salario_base");
                          }}
                          value={this.state.salario_base}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <div style={{ textAlign: "center" }}>
                          <TextField
                            id="direccion"
                            fullWidth={true}
                            disabled={editEmpleado}
                            label="Ingrese dirección"
                            onChange={event => {
                              this.changeValue(event, "direccion");
                            }}
                            value={this.state.direccion}
                          />
                        </div>
                      </Grid>
                      <br />
                      <Grid item xs={12}>
                        <InputLabel htmlFor="age-simple">
                          Tipo de empleado
                        </InputLabel>
                        <Select
                          value={this.state.isAsesor}
                          disabled={editEmpleado}
                          onChange={event =>
                            this.setState({ isAsesor: event.target.value })
                          }
                          inputProps={{
                            name: "Tipo de empleado",
                            fullWidth: true,
                            id: "age-simple",
                            disabled: editEmpleado
                          }}
                        >
                          <MenuItem value={true}>Asesor</MenuItem>
                          <MenuItem value={false}>Gerente</MenuItem>
                        </Select>
                      </Grid>

                      {this.state.isAsesor ? (
                        <React.Fragment>
                          <Grid item xs={12}>
                            <TextField
                              id="comision"
                              disabled={editEmpleado}
                              type="number"
                              fullWidth={true}
                              label="Ingrese Comisión"
                              onChange={event => {
                                this.changeValue(event, "comision");
                              }}
                              value={this.state.comision}
                            />
                          </Grid>
                          <br />
                          <Grid item xs={12}>
                            <InputLabel htmlFor="sede">Sede</InputLabel>
                            <Select
                              value={this.state.codigoSede}
                              disabled={editEmpleado}
                              onChange={event =>
                                this.setState({
                                  codigoSede: event.target.value
                                })
                              }
                              inputProps={{
                                name: "Sede",
                                disabled: editEmpleado,
                                fullWidth: true,
                                id: "sede"
                              }}
                            >
                              {this.state.sedes.map(sede => (
                                <MenuItem value={sede.codigo}>
                                  {sede.nombre}
                                </MenuItem>
                              ))}
                            </Select>
                          </Grid>
                        </React.Fragment>
                      ) : null}
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
                    {!this.state.editEmpleado ? (
                      <Button
                        style={{ color: "#335182" }}
                        onClick={() => this.llenarDatos()}
                      >
                        Editar
                      </Button>
                    ) : (
                      <Link href={`/ver_empleados`}>
                        <Button style={{ color: "#335182" }}>
                          {" "}
                          Volver a empleados
                        </Button>
                      </Link>
                    )}
                  </Grid>
                </Grid>
              </CardActions>
            </Card>
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

        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={this.state.openSuccess}
          autoHideDuration={6000}
          onClose={() => this.setState({ openSuccess: false })}
        >
          <SnackbarContent
            style={{
              backgroundColor: "green"
            }}
            message={this.state.msgSuccess}
            action={[
              <IconButton
                key={1}
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() => this.setState({ openSuccess: false })}
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
