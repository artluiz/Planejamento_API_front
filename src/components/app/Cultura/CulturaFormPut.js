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
            id: data.get('id'),
            nome: data.get('nome'),
            preco_venda: data.get('preco_venda'),
            embalagem_venda: data.get('embalagem_venda'),
          };

          if(formData.nome === ''){
            formData.nome = null;
          }
          if(formData.preco_venda < 0 || formData.preco_venda === ''){
            formData.preco_venda = null;
          }
          if(formData.embalagem_venda === ''){
            formData.embalagem_venda = null;
          }

        axios.put('http://localhost:8080/cultura', formData)
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
            Atualizar Cultura
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
                  name="nome"
                  fullWidth
                  id="nome"
                  label="Nome"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="preco_venda"
                  label="Preço de Venda"
                  name="preco_venda"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="embalagem_venda"
                  label="Embalagem"
                  type="embalagem_venda"
                  id="embalagem_venda"
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