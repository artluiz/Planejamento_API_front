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

const defaultTheme = createTheme();

export default function SignUp() {
    
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = {
        codigo: data.get('codigo'),
        nome_etapa: data.get('nome_etapa'),
        numero_dias: data.get('numero_dias'),
        id_insumo: data.get('id_insumo'),
        unidade: data.get('unidade'),
        quantidade_ha: data.get('quantidade_ha'),
      };

      if(formData.codigo === ''){
        formData.codigo = null;
      }
      if(formData.nome_etapa === ''){
        formData.nome_etapa = null;
      }
      if(formData.quantidade_ha < 0 || formData.numero_dias === ''){
        formData.numero_dias = null;
      }
      if(formData.quantidade_ha < 0 || formData.id_insumo === ''){
        formData.id = null;
      }
      if(formData.unidade === ''){
        formData.unidade = null;
      }
      if(formData.quantidade_ha < 0 || formData.quantidade_ha === ''){
        formData.quantidade_ha = null;
      }

      axios.put('http://localhost:8080/tipo', formData)
        .then((response) => {
        console.log('Dados cadastrados com sucesso:', response.data);
      })
        .catch((error) => {
        console.error('Erro ao cadastrar dados:', error);
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
            Atualizar Tipo de Planejamento
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                  name="id"
                  required
                  fullWidth
                  id="id"
                  label="Id"
                  autoFocus
                />
              </Grid>
            <Grid item xs={12}>
            <TextField
                fullWidth
                id="codigo"
                label="Codigo"
                name="codigo"
                autoComplete="0"
              />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="Nome Etapa"
                  name="nome_etapa"
                  fullWidth
                  id="nome_etapa"
                  label="Nome Etapa"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="numero_dias"
                  label="Número de dias"
                  name="numero_dias"
                  autoComplete="0"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="id_insumo"
                  label="ID Insumo"
                  type="id_insumo"
                  id="id_insumo"
                  autoComplete="0"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="unidade"
                  label="Unidade"
                  name="unidade"
                  autoComplete="Litros"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="quantidade_ha"
                  label="Quantidade/ha"
                  type="quantidade_ha"
                  id="quantidade_ha"
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
            Atualizar
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </React.Fragment>
  );
}