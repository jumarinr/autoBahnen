import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Link from '@material-ui/core/Link';
import ContactsIcon from '@material-ui/icons/Contacts';
import HomeIcon from '@material-ui/icons/Home';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import WorkOutlineIcon from '@material-ui/icons/WorkOutline';

import WorkIcon from '@material-ui/icons/Work';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));
  export default function Header(props) {
    const classes = useStyles();
  
    return (
      <div className={classes.root}>
        <AppBar position="static" style={{backgroundColor: '#335182'}}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
            AutoBahnen S.A.
            </Typography>
            <Link href="/" >
            <Button ><span style={{color: 'white', fontSize: '50%'}}><IconButton><HomeIcon style={{color: 'white'}}/></IconButton>
            <br/>Inicio</span></Button>
            </Link>
            { props.props != 'TablaEmpleados' ? 
            <Link href="/ver_empleados" >
            <Button ><span style={{color: 'white', fontSize: '50%'}}><IconButton><WorkIcon style={{color: 'white'}}/></IconButton>
            <br/>Ver empleados</span></Button>
            </Link>
            : null     
            }
            { props.props === 'TablaEmpleados' ? 
            <Link href="/agregar_empleado" >
            <Button ><span style={{color: 'white', fontSize: '50%'}}><IconButton><WorkOutlineIcon style={{color: 'white'}}/></IconButton>
            <br/>Agregar empleado</span></Button>
            </Link>
            : null }
            { props.props === 'TablaClientes' ? 
            <Link href="/agregar_cliente" >
               <Button style={{color: 'white'}}>
               <span style={{color: 'white', fontSize: '50%'}}>
                   <IconButton>   <GroupAddIcon style={{color: 'white'}}/> </IconButton>
                   <br/>
                 Agregar cliente
                 </span>    
              </Button>
              </Link>
              : null
            }
            { props.props != 'TablaClientes' ? 
            <Link href="/ver_clientes" >
            <Button ><span style={{color: 'white', fontSize: '50%'}}><IconButton><ContactsIcon style={{color: 'white'}}/></IconButton>
            <br/>Ver clientes</span></Button>
            </Link>
            : null 
            }
          </Toolbar>
        </AppBar>
      </div>
    );
  }
