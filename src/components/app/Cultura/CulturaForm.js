import { useEffect, useState } from 'react';
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

export default function CulturaCRUD(request, id) {
  const [data, setData] = useState([]);
  useEffect(() => {
    console.log(id);
    axios.get(`http://localhost:8080/cultura/${id}`)
      .then(response => {
        console.log(response.data);
        setData(response.data)
      })
      .catch(error => {
        console.error('Erro ao carregar os dados da API:', error);
      });
  }, [id]);

  const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const formData = {
          id: data.get('id'),
          nome: data.get('nome'),
          preco_venda: data.get('preco_venda'),
          embalagem_venda: data.get('embalagem_venda'),
        };
      switch (request){
          case 'post':
              axios.post(`http://localhost:8080/cultura/${id}`, formData)
                .then((response) => {
                console.log('Dados cadastrados com sucesso:', response.data);
                })
                .catch((error) => {
                console.error('Erro ao cadastrar dados:', error);
            });
            window.location.reload();
          break;

          case 'put':
              axios.put(`http://localhost:8080/cultura/${id}`, formData)
                .then((response) => {
                console.log('Dados atualizados com sucesso:', response.data);
                })
                .catch((error) => {
                console.error('Erro ao atualizar dados:', error);
            });
            window.location.reload();

          break;

          case 'delete':
              axios.delete(`http://localhost:8080/cultura/inativar/${id}`, formData)
                .then((response) => {
                console.log('Dados atualizados com sucesso:', response.data);
                })
                .catch((error) => {
                console.error('Erro ao atualizar dados:', error);
            });
            window.location.reload();

          break;

          default:
            axios.get(`http://localhost:8080/cultura/${id}`)
                .then(response => {
                  console.log(response.data);
                  setData(response.data)
                })
                .catch(error => {
                  console.error('Erro ao carregar os dados da API:', error);
                });

          break;
      }
      
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
          {request === 'get' ? 'Cultura' : null}
          {request === 'put' ? 'Atualizar Cultura' : null}
          {request === 'delete' ? 'Apagar Cultura' : null}
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
                  autoComplete = '0'
                  InputProps={{
                    readOnly: request === "get" ? true: false,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="nome"
                  required
                  fullWidth
                  id="nome"
                  label="Nome"
                  autoFocus
                  autoComplete={request === "post" ? "Nome": data.nome}
                  InputProps={{
                    readOnly: request === "get" ? true: false,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="preco_venda"
                  label="Preço de Venda"
                  name="preco_venda"
                  autoComplete={request === "post" ? "0": data.preco_venda}
                  InputProps={{
                    readOnly: request === "get" ? true: false,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="embalagem_venda"
                  label="Embalagem"
                  type="embalagem_venda"
                  id="embalagem_venda"
                  autoComplete={request === "post" ? "": data.embalagem_venda}
                  InputProps={{
                    readOnly: request === "get" ? true: false,
                  }}
                />
              </Grid>
            </Grid>
            {/*<Link to={`/Cultura/PostPage`} style={{ textDecoration: 'none' }}></Link>*/}
            if (request !== 'get') {
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
              {request === 'put' ? 'Atualizar Cultura' : null}
              {request === 'delete' ? 'Apagar Cultura' : null}
            </Button>
            }
            
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </React.Fragment>
  );
}