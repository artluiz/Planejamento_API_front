import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Link } from 'react-router-dom';

export const mainListItems = (
  <React.Fragment>
    <Link to={`/Cultura/GetPage`} style={{ textDecoration: 'none' }}>
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Cultura" />
      </ListItemButton>
    </Link>
    <Link to={`/Plantio/GetPage`} style={{ textDecoration: 'none' }}>
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Plantio" />
      </ListItemButton>
    </Link>
    <Link to={`/Insumo/GetPage`} style={{ textDecoration: 'none' }}>
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Insumos" />
      </ListItemButton>
    </Link>
    <Link to={`/Planejamento/GetPage`} style={{ textDecoration: 'none' }}>
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Planejamento" />
      </ListItemButton>
    </Link>
    <Link to={`/Tipo/GetPage`} style={{ textDecoration: 'none' }}>
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Tipos de Planejamento" />
      </ListItemButton>
    </Link>
    <Link to={`/Etapa/GetPage`} style={{ textDecoration: 'none' }}>
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Etapa" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);
  
export const SecondaryListItems = (pagina) =>{
  return(
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <Link to={`/${pagina}/GetPage`} style={{ textDecoration: 'none' }}>
        <ListItemButton>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Listar" />
        </ListItemButton>
      </Link>
      <Link to={`/${pagina}/PostPage`} style={{ textDecoration: 'none' }}>
        <ListItemButton>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Adicionar" />
        </ListItemButton>
      </Link>
      <Link to={`/${pagina}/PutPage`} style={{ textDecoration: 'none' }}>
        <ListItemButton>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Atualizar" />
        </ListItemButton>
      </Link>
      <Link to={`/${pagina}/DeletePage`} style={{ textDecoration: 'none' }}>
        <ListItemButton>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Remover" />
        </ListItemButton>
      </Link>
  </React.Fragment>
  );
};
