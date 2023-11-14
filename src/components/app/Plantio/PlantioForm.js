import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
//import { Link } from 'react-router-dom';

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const formData = {
            nome: data.get('nome'),
            id_cultura_anterior: data.get('id_cultura_anterior'),
            id_planejamento: data.get('id_planejamento'),
          };

        axios.post('http://localhost:8080/plantio', formData)
            .then((response) => {
            console.log('Dados atualizados com sucesso:', response.data);
            })
            .catch((error) => {
            console.error('Erro ao atualizar dados:', error);
        });
        window.location.reload();
      };

  return (
  <React.Fragment>
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Cadastro Plantio
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="Nome"
                  name="nome"
                  required
                  fullWidth
                  id="nome"
                  label="Nome"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="id_cultura_anterior"
                  label="ID Cultura Anterior"
                  name="id_cultura_anterior"
                  autoComplete="0"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="id_planejamento"
                  label="ID Planejamento"
                  type="id_planejamento"
                  id="id_planejamento"
                  autoComplete="0"
                />
              </Grid>
            </Grid>
            {/*<Link to={`/Cultura/PostPage`} style={{ textDecoration: 'none' }}></Link>*/}
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
            Cadastrar
            </Button>
            
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </React.Fragment>
  );
}