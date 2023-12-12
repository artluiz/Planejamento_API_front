import { useEffect, useState } from 'react';
import {useLocation, Link} from 'react-router-dom';
import * as React from 'react';
import axios from 'axios';
import { Box, Container, Grid, Paper, createTheme, ThemeProvider, Typography, CssBaseline, Avatar, TextField, Button } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AppBar from '../SideBar/AppBar';
import Drawer from '../SideBar/Drawer';
import Autocomplete from '@mui/material/Autocomplete';

const defaultTheme = createTheme();

export default function PlantioForm() {
  const [data, setData] = useState([]);
  const [data2, setData2] = React.useState([]);
  const [data3, setData3] = React.useState([]);
  const [objetoEncontrado, setObjetoEncontrado] = React.useState(null);
  const [objetoEncontrado2, setObjetoEncontrado2] = React.useState(null);
  const [inputValueN, setInputValueN] = useState('');
  const [inputValueCA, setInputValueCA] = useState('');
  const [inputValueP, setInputValueP] = useState(null);

  const location = useLocation();

  const state = location.state;
  console.log(location)
  const { request, id } = state;

  const handleChangeN = (event) => {
    setInputValueN(event.target.value);
  };

  const handleChangeCA = (event, newValue) => {
    setInputValueCA(newValue);
  };

  const handleChangeP = (event, newValue) => {
    setInputValueP(newValue);
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

  React.useEffect(() => {
      axios.get(`http://localhost:8080/planejamento/Nome`)
      .then(response => {
        console.log(response.data);
        setData2(response.data);
      })
      .catch(error => {
        console.error('Erro ao carregar os dados da API:', error);
      });
  }, [request]);

  React.useEffect(() => {
    axios.get('http://localhost:8080/cultura/Nome')
      .then(response => {
        console.log(response.data);
        setData3(response.data)
      })
      .catch(error => {
        console.error('Erro ao carregar os dados da API:', error);
      });
  }, [request]);

  const encontrarObjetoPorIdCulturaAnte = (idCulturaAnterior, array) => {
    return array.find(obj => obj.id === idCulturaAnterior);
  };

  const encontrarObjetoPorIdPlanejamento = (idPlanejamento, array) => {
    return array.find(obj => obj.id === idPlanejamento);
  };

  React.useEffect(() => {
    const objeto = encontrarObjetoPorIdCulturaAnte(data.id_cultura_anterior, data3);
    console.log(objeto);
    setObjetoEncontrado2(objeto);
  }, [data, data3]);

  React.useEffect(() => {
    const objeto = encontrarObjetoPorIdPlanejamento(data.id_planejamento, data2);
    console.log(objeto);
    setObjetoEncontrado(objeto);
  }, [data, data2]);
  
  useEffect(() => {
    if(request !== 'post'){
      setInputValueN(data.nome);
      if(objetoEncontrado2 !== null){
        setInputValueCA(objetoEncontrado2);
      }
      if(objetoEncontrado !== null){
        setInputValueP(objetoEncontrado);
      }
    }
    
  }, [data, request, objetoEncontrado, objetoEncontrado2]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = {
      id: data.get('id'),
      nome: data.get('nome'),
      id_cultura_anterior: inputValueCA.id,
      id_planejamento: inputValueP.id,
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
                          <Autocomplete
                            disablePortal
                            id="id_cultura_anterior"
                            options={data3}
                            getOptionLabel={(option) => option.nome}
                            value={inputValueCA}
                            onChange = {handleChangeCA}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Cultura Anterior" />}
                            readOnly={request === "get" ? true : false}
                            required= {request === "post" ? true : false}
                            />
                        </Grid>
                        <Grid item xs={12}>
                          <Autocomplete
                            disablePortal
                            id="id_planejamento"
                            options={data2}
                            getOptionLabel={(option) => option.nome_etapa}
                            value={inputValueP}
                            onChange = {handleChangeP}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Planejamento" />}
                            readOnly={request === "get" ? true : false}
                            required= {request === "post" ? true : false}
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
