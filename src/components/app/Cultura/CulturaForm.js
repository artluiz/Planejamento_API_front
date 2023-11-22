import { useEffect, useState } from 'react';
import {useLocation, Link} from 'react-router-dom';
import * as React from 'react';
import axios from 'axios';
import { Box, Container, Grid, Paper, createTheme, ThemeProvider, Typography, CssBaseline, Avatar, TextField, Button } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const defaultTheme = createTheme();

export default function CulturaForm() {
  const [data, setData] = useState([]);
  const [inputValueN, setInputValueN] = useState(data.nome);
  const [inputValueP, setInputValueP] = useState(data.preco_venda);
  const [inputValueE, setInputValueE] = useState(data.embalagem_venda);

  const location = useLocation();

  const state = location.state;
  //console.log(location)
  const { request, id } = state;

  const handleChangeN = (event) => {
    setInputValueN(event.target.value);
  };

  const handleChangeP = (event) => {
    setInputValueP(event.target.value);
  };

  const handleChangeE = (event) => {
    setInputValueP(event.target.value);
  };

  useEffect(() => {
    axios.get(`http://localhost:8080/cultura/${id}`)
      .then(response => {
        console.log(response.data);
        setData(response.data);
      })
      .catch(error => {
        console.error('Erro ao carregar os dados da API:', error);
      });
  }, [id]);

  useEffect(() => {

    setInputValueN(data.nome);
    setInputValueP(data.preco_venda);
    setInputValueE(data.embalagem_venda);
    
  }, [data]);

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
          })
          .catch((error) => {
            console.error('Erro ao cadastrar dados:', error);
          });
        //window.location.reload();
        break;

      case 'put':
        console.log("chegou");
        axios.put(`http://localhost:8080/cultura`, formData)
          .then((response) => {
            console.log('Dados atualizados com sucesso:', response.data);
          })
          .catch((error) => {
            console.error('Erro ao atualizar dados:', error);
          });
        //window.location.reload();
        break;

      case 'delete':
        axios.delete(`http://localhost:8080/cultura/inativar/${id}`, formData)
          .then((response) => {
            console.log('Dados atualizados com sucesso:', response.data);
          })
          .catch((error) => {
            console.error('Erro ao atualizar dados:', error);
          });
        //window.location.reload();
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
    console.log('Request:', request),
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
                            autoComplete={String(data.id)}
                            defaultValue={String(id)}
                            InputProps={{
                              readOnly: true
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
                            value={request === "post" ? null : inputValueN || ''}
                            onChange={handleChangeN}
                            InputProps={{
                              readOnly: request !== "get" ? false : true
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
                            value={request === "post" ? null : inputValueP || ''}
                            onChange={handleChangeP}
                            InputProps={{
                              readOnly: request !== "get" ? false : true
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
                            value={request === "post" ? null : inputValueE || ''}
                            onChange={handleChangeE}
                            InputProps={{
                              readOnly: request !== "get" ? false : true
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
                          {request === 'put' ? 'Atualizar Cultura' : null}
                          {request === 'delete' ? 'Apagar Cultura' : null}
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      >
                        <Link  to="/Cultura/GetPage" style={{color:'white', textDecoration: 'none' }}>
                          Voltar
                        </Link>
                    </Button>
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
