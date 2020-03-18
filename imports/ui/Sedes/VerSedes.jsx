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
import swal from "sweetalert";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Header from "../Header/Header";
import ReportProblemIcon from "@material-ui/icons/ReportProblem";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import "moment/locale/es";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

export default class VerSedes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sedes: [],
      loading: true,
      openError: false,
      msgError: "",
      errorF: false,
      noData: false
    };
  }
  componentDidMount() {
    Meteor.call("ReadSedes", (err, result) => {
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
          sedes: result,
          loading: false,
          errorF: !!(result.length === 0),
          noData: !!(result.length === 0)
        });
      }
    });
  }
  render() {
    return (
      <div>
        <Header props={"verSedes"} />

        <hr />
        <Grid
          container
          justify="center"
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Grid item xs={12} md={10}>
            <TableContainer
              style={{ height: "100%", width: "100%" }}
              component={Paper}
            >
              {this.state.loading ? (
                <React.Fragment>
                  <Card variant="outlined">
                    <CardContent>
                      <div style={{ color: "#335182", textAlign: "center" }}>
                        Cargando la información de las sedes...
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
                      {this.state.noData ? (
                        <h4 style={{ textAlign: "center" }}>
                          No hay elementos guardados en la tabla sedes.
                        </h4>
                      ) : (
                        <h4 style={{ color: "red", textAlign: "center" }}>
                          <IconButton aria-label="problem">
                            <ReportProblemIcon
                              style={{ fontSize: "50px", color: "red" }}
                            />
                          </IconButton>
                          {this.state.msgError}
                        </h4>
                      )}
                    </CardContent>
                  </Card>
                </React.Fragment>
              ) : (
                <Table size="small" aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Codigo</TableCell>
                      <TableCell align="center">Nombre</TableCell>
                      <TableCell align="center">Direccion</TableCell>
                      <TableCell align="center">Municipio</TableCell>
                      <TableCell align="center">Telefono</TableCell>
                      <TableCell align="center">Email</TableCell>
                      <TableCell align="center">Gerente</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.sedes.map(row => {
                      return (
                        <TableRow key={row.codigo}>
                          <TableCell align="center" component="th" scope="row">
                            {row.codigo}
                          </TableCell>
                          <TableCell
                            style={{ textTransform: "capitalize" }}
                            align="center"
                          >
                            {row.nombre}
                          </TableCell>
                          <TableCell align="center">
                            {row.direccion || "--"}
                          </TableCell>
                          <TableCell align="center">
                            {row.municipio || "--"}
                          </TableCell>
                          <TableCell align="center">
                            {row.telefono || "--"}
                          </TableCell>
                          <TableCell align="center">
                            {row.email || "--"}
                          </TableCell>
                          <TableCell align="center">
                            {row.gerente || "--"}
                          </TableCell>
                        </TableRow>
                      );
                    })}
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
