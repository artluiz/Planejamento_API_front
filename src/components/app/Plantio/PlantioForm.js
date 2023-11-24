import { useEffect, useState } from 'react';
import {useLocation, Link} from 'react-router-dom';
import * as React from 'react';
import axios from 'axios';
import { Box, Container, Grid, Paper, createTheme, ThemeProvider, Typography, CssBaseline, Avatar, TextField, Button } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AppBar from '../SideBar/AppBar';
import Drawer from '../SideBar/Drawer';

const defaultTheme = createTheme();

export default function PlantioForm() {
  const [data, setData] = useState([]);
  const [inputValueN, setInputValueN] = useState('');
  const [inputValueC, setInputValueC] = useState('');
  const [inputValueP, setInputValueP] = useState('');

  const location = useLocation();

  const state = location.state;
  console.log(location)
  const { request, id } = state;

  const handleChangeN = (event) => {
    setInputValueN(event.target.value);
  };

  const handleChangeC = (event) => {
    setInputValueC(event.target.value);
  };

  const handleChangeP = (event) => {
    setInputValueP(event.target.value);
  };

  useEffect(() => {
    if(request !== 'post'){
      axios.get(`http://localhost:8080/plantio/${id}`)
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
      setInputValueC(data.id_planejamento);
      setInputValueP(data.id_cultura_anterior);
    }
    
  }, [data, request]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = {
      id: data.get('id'),
      nome: data.get('nome'),
      id_cultura_anterior: data.get('id_cultura_anterior'),
      id_planejamento: data.get('id_planejamento'),
    };

    switch (request) {
      case 'post':
        axios.post(`http://localhost:8080/plantio`, formData)
          .then((response) => {
            console.log('Dados cadastrados com sucesso:', response.data);
            window.location.assign("/Plantio/GetPage");
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
        if(formData.id_cultura_anterior === '' || formData.id_cultura_anterior < 0){
          formData.id_cultura_anterior = null;
        }
        if(formData.id_planejamento === '' || formData.id_planejamento < 0){
          formData.id_planejamento = null;
        }
        
        axios.put(`http://localhost:8080/plantio`, formData)
          .then((response) => {
            console.log('Dados atualizados com sucesso:', response.data);
            window.location.assign("/Plantio/GetPage");
          })
          .catch((error) => {
            console.error('Erro ao atualizar dados:', error);
          });
          
        break;

      case 'delete':
        axios.delete(`http://localhost:8080/plantio/inativar/${id}`, formData)
          .then((response) => {
            console.log('Dados atualizados com sucesso:', response.data);
            window.location.assign("/Plantio/GetPage");
          })
          .catch((error) => {
            console.error('Erro ao atualizar dados:', error);
          });
        break;

      default:
        axios.get(`http://localhost:8080/plantio/${id}`)
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
    <React.Fragment>
      <ThemeProvider theme={defaultTheme}>
          <AppBar/>  
          <Drawer/> 
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
                      {request === 'get' ? 'Plantio' : null}
                      {request === 'post' ? 'Cadastrar Plantio' : null}
                      {request === 'put' ? 'Atualizar Plantio' : null}
                      {request === 'delete' ? 'Apagar Plantio' : null}
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                      <Grid container spacing={2}>
                        {request === "post" ? null : <Grid item xs={12}>
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
                            fullWidth
                            id="id_cultura_anterior"
                            label="Preço de Venda"
                            name="id_cultura_anterior"
                            value={inputValueC || ''}
                            onChange={handleChangeC}
                            InputProps={{
                              readOnly: request !== "get" ? false : true,
                              required: request === "post" ? true : false
                            }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            name="id_planejamento"
                            label="ID_Planejamento"
                            type="id_planejamento"
                            id="id_planejamento"
                            value={inputValueP || ''}
                            onChange={handleChangeP}
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
                          {request === 'post' ? 'Cadastrar Plantio' : null}
                          {request === 'put' ? 'Atualizar Plantio' : null}
                          {request === 'delete' ? 'Apagar Plantio' : null}
                      </Button>
                    )}
                    <Link  to="/Plantio/GetPage" style={{color:'white', textDecoration: 'none' }}>
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
  </ThemeProvider>
  </React.Fragment>
);
};
