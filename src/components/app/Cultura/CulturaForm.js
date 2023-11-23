import { useEffect, useState } from 'react';
import {useLocation, Link} from 'react-router-dom';
import * as React from 'react';
import axios from 'axios';
import { Box, Container, Grid, Paper, createTheme, ThemeProvider, Typography, CssBaseline, Avatar, TextField, Button } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const defaultTheme = createTheme();

export default function CulturaForm() {
  const [data, setData] = useState([]);
  const [inputValueN, setInputValueN] = useState('');
  const [inputValueP, setInputValueP] = useState('');
  const [inputValueE, setInputValueE] = useState('');

  const location = useLocation();

  const state = location.state;
  console.log(location)
  const { request, id } = state;

  const handleChangeN = (event) => {
    setInputValueN(event.target.value);
  };

  const handleChangeP = (event) => {
    setInputValueP(event.target.value);
  };

  const handleChangeE = (event) => {
    setInputValueE(event.target.value);
  };

  useEffect(() => {
    if(request !== 'post'){
      axios.get(`http://localhost:8080/cultura/${id}`)
      .then(response => {
        console.log(response.data);
        setData(response.data);
      })
      .catch(error => {
        console.error('Erro ao carregar os dados da API:', error);
      });
    }
    
  }, [id, request]);
  
  useEffect(() => {
    if(request !== 'post'){
      setInputValueN(data.nome);
      setInputValueP(data.preco_venda);
      setInputValueE(data.embalagem_venda);
    }
    
  }, [data, request]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = {
      id: data.get('id'),
      nome: data.get('nome'),
      preco_venda: data.get('preco_venda'),
      embalagem_venda: data.get('embalagem_venda'),
    };

    switch (request) {
      case 'post':
        axios.post(`http://localhost:8080/cultura`, formData)
          .then((response) => {
            console.log('Dados cadastrados com sucesso:', response.data);
          window.location.assign("/Cultura/GetPage");
          })
          .catch((error) => {
            console.error('Erro ao cadastrar dados:', error);
          });
        break;

      case 'put':

        if(formData.nome === ''){
          formData.nome = null;
        }
        if(formData.codigo === ''){
          formData.codigo = null;
        }
        if(formData.preco_venda === '' || formData.preco_venda < 0){
          formData.preco_venda = null;
        }
        if(formData.embalagem_venda === ''){
          formData.embalagem_venda = null;
        }

        axios.put(`http://localhost:8080/cultura`, formData)
          .then((response) => {
            console.log('Dados atualizados com sucesso:', response.data);
            window.location.assign("/Cultura/GetPage");
          })
          .catch((error) => {
            console.error('Erro ao atualizar dados:', error);
          });
        break;

      case 'delete':
        axios.delete(`http://localhost:8080/cultura/inativar/${id}`, formData)
          .then((response) => {
            console.log('Dados atualizados com sucesso:', response.data);
            window.location.assign("/Cultura/GetPage");
          })
          .catch((error) => {
            console.error('Erro ao atualizar dados:', error);
          });
        break;

      default:
        axios.get(`http://localhost:8080/cultura/${id}`)
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.error('Erro ao carregar os dados da API:', error);
          });
        break;
    }
  };

  return (
    <Box component="main" sx={{
      backgroundColor: (theme) =>
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[900],
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
    }}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <ThemeProvider theme={defaultTheme}>
                <Container component="main" maxWidth="xs">
                  <CssBaseline />
                  <Box sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}>
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                      <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                      {request === 'get' ? 'Cultura' : null}
                      {request === 'post' ? 'Cadastrar Cultura' : null}
                      {request === 'put' ? 'Atualizar Cultura' : null}
                      {request === 'delete' ? 'Apagar Cultura' : null}
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                      <Grid container spacing={2}>
                        {request === "post" ? null : <Grid item xs={12}>
                        <TextField
                            name="id"
                            fullWidth
                            id="id"
                            label="Id"
                            autoComplete={String(data.id)}
                            defaultValue={String(id)}
                            InputProps={{
                              readOnly: true,
                            }}
                          />
                        </Grid>}
                        <Grid item xs={12}>
                          <TextField
                            name="nome"
                            fullWidth
                            id="nome"
                            label="Nome"
                            value={inputValueN || ''}
                            onChange={handleChangeN}
                            InputProps={{
                              readOnly: request !== "get" ? false : true,
                              autoFocus: request === "get" ? false : true,
                              required: request === "post" ? true : false
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
                            value={inputValueP || ''}
                            onChange={handleChangeP}
                            InputProps={{
                              readOnly: request !== "get" ? false : true,
                              required: request === "post" ? true : false
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
                            value={inputValueE || ''}
                            onChange={handleChangeE}
                            InputProps={{
                              readOnly: request !== "get" ? false : true,
                              required: request === "post" ? true : false
                            }}
                          />
                        </Grid>
                      </Grid>
                    {request !== 'get' && (
                      <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      >
                        {request === 'post' ? 'Cadastrar Cultura' : null}
                        {request === 'put' ? 'Atualizar Cultura' : null}
                        {request === 'delete' ? 'Apagar Cultura' : null}
                      </Button>
                    )}
                    <Link  to="/Cultura/GetPage" style={{color:'white', textDecoration: 'none' }}>
                      <Button
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      >
                          Voltar
                      </Button>
                    </Link>
                  </Box>
                </Box>
              </Container>
            </ThemeProvider>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  </Box>
);
};
