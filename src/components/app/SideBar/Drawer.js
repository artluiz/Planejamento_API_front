import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { mainListItems, SecondaryListItems } from '../listItems';

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      width: open ? drawerWidth : theme.spacing(7), // Largura total quando aberto, largura mínima quando fechado
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      [theme.breakpoints.up('sm')]: {
        width: open ? drawerWidth : theme.spacing(7), // Ajustar a largura para telas maiores
      },
      ...(!open && {
        width: theme.spacing(7), // Largura mínima quando fechado
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(7), // Ajustar a largura mínima para telas maiores quando fechado
        },
        marginLeft: 0, // Remover margem à esquerda quando fechado
      }),
    },
  }),
);

export default function HomePage() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Drawer variant="permanent" open={open}>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: [1],
        }}
      >
        <IconButton onClick={toggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List component="nav">
        {mainListItems}
        <Divider sx={{ my: 1 }} />
        {SecondaryListItems('Cultura')}
      </List>
    </Drawer>
  );
  
}
