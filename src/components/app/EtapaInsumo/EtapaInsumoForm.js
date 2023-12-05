import * as React from 'react';
import { useEffect, useState } from 'react';
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
import {useLocation, Link} from 'react-router-dom';
import AppBar from '../SideBar/AppBar';
import Drawer from '../SideBar/Drawer';
import Autocomplete from '@mui/material/Autocomplete';
//import { Link } from 'react-router-dom';

const defaultTheme = createTheme();

export default function SignUp() {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [data4, setData4] = useState([]);
  const [selectedUnidade, setSelectedUnidade] = React.useState(null);
  const [objetoEncontrado, setObjetoEncontrado] = React.useState(null);
  const [objetoEncontrado2, setObjetoEncontrado2] = React.useState(null);
  const [objetoEncontrado3, setObjetoEncontrado3] = React.useState(null);
  const [inputValueQ, setInputValueQ] = React.useState(null);
  const [inputValueE, setInputValueE] = React.useState(null);
  const [inputValueC, setInputValueC] = React.useState(null);
  const [inputValueI, setInputValueI] = React.useState(null);

  const location = useLocation();
  
  const state = location.state;
  console.log(location)
  const { request, id } = state;
  
  const handleChangeQ = (event) => {
    setInputValueQ(event.target.value);
  };

  const handleChangeE = (event, newValue) => {
    setInputValueE(newValue);
  };

  const handleChangeC = (event, newValue) => {
    setInputValueC(newValue);
  };

  const handleChangeI = (event, newValue) => {
    console.log(newValue);
    setInputValueI(newValue);
  };

  useEffect(() => {
    if(request !== 'post'){
      axios.get(`http://localhost:8080/PlanejamentoEtapaInsumo/${id}`)
        .then(response => {
          console.log(response.data);
          setData(response.data)
        })
        .catch(error => {
          console.error('Erro ao carregar os dados da API:', error);
        });
    }
  }, [id, request]);

  useEffect(() => {
    axios.get('http://localhost:8080/PlanejamentoEtapa/Nome')
      .then(response => {
        console.log(response.data);
        setData2(response.data)
      })
      .catch(error => {
        console.error('Erro ao carregar os dados da API:', error);
      });
  }, [request]);

  useEffect(() => {
    axios.get('http://localhost:8080/cultura/Nome')
      .then(response => {
        console.log(response.data);
        setData3(response.data)
      })
      .catch(error => {
        console.error('Erro ao carregar os dados da API:', error);
      });
  }, [request]);

  useEffect(() => {
    axios.get('http://localhost:8080/insumos/Nome')
      .then(response => {
        console.log(response.data);
        setData4(response.data)
      })
      .catch(error => {
        console.error('Erro ao carregar os dados da API:', error);
      });
  }, [request]);

  const encontrarObjetoPorIdEtapa = (idEtapa, array) => {
    console.log(idEtapa);
    return array.find(obj => obj.id === idEtapa);
  };

  const encontrarObjetoPorIdCultura = (idCultura, array) => {
    return array.find(obj => obj.id === idCultura);
  };

  const encontrarObjetoPorIdInsumo = (idInsumo, array) => {
    return array.find(obj => obj.id === idInsumo);
  };

  useEffect(() => {
    const objeto = encontrarObjetoPorIdEtapa(data.planejamento_etapa_id, data2);
    console.log(objeto);
    setObjetoEncontrado(objeto);
  }, [data, data2]);

  useEffect(() => {
    const objeto = encontrarObjetoPorIdCultura(data.id_cultura, data3);
    console.log(objeto);
    setObjetoEncontrado2(objeto);
  }, [data, data3]);

  useEffect(() => {
    const objeto = encontrarObjetoPorIdInsumo(data.id_insumo, data4);
    console.log(objeto);
    setObjetoEncontrado3(objeto);
  }, [data, data4]);

  useEffect(() => {
    if(request !== 'post'){
      if(objetoEncontrado3 !== null){
        setInputValueI(objetoEncontrado3);
      }
      setInputValueQ(data.quantidade_ha);
      setSelectedUnidade(data.unidade);
      if(objetoEncontrado2 !== null){
        setInputValueC(objetoEncontrado2);
      }
      if(objetoEncontrado !== null){
        setInputValueE(objetoEncontrado);
      }
    }
    
  }, [data, request, objetoEncontrado, objetoEncontrado2, objetoEncontrado3]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = {
        id: data.get('id'),
        unidade: selectedUnidade,
        quantidade_ha: data.get('quantidade_ha'),
        planejamento_etapa_id: inputValueE.id,
        id_cultura: inputValueC.id,
        id_insumo: inputValueI.id,
      };

      switch (request) {
        case 'post':
          axios.post(`http://localhost:8080/PlanejamentoEtapaInsumo`, formData)
            .then((response) => {
              console.log('Dados cadastrados com sucesso:', response.data);
              window.location.assign("/Etapa/GetPage");
            })
            .catch((error) => {
              console.error('Erro ao cadastrar dados:', error);
            });
          break;
  
        case 'put':
          
          if(formData.unidade === ''){
            formData.unidade = null;
          }
          if(formData.quantidade_ha === ''){
            formData.quantidade_ha = null;
          }
          if(formData.planejamento_etapa_id === ''){
            formData.planejamento_etapa_id = null;
          }
          if(formData.id_cultura === ''){
            formData.id_cultura = null;
          }
          if(formData.id_insumo === ''){
            formData.id_insumo = null;
          }
          
          axios.put(`http://localhost:8080/PlanejamentoEtapaInsumo`, formData)
            .then((response) => {
              console.log('Dados atualizados com sucesso:', response.data);
              window.location.assign("/Etapa/GetPage");
            })
            .catch((error) => {
              console.error('Erro ao atualizar dados:', error);
            });
          break;
  
        default:
          axios.get(`http://localhost:8080/PlanejamentoEtapaInsumo/${id}`)
            .then(response => {
              console.log(response.data);
            })
            .catch(error => {
              console.error('Erro ao carregar os dados da API:', error);
            });
          break;
      }
  };

  const unidade = [
    'KG',
    'L',
  ];

  const handleSelectionChange = (event, newValue) => {
    setSelectedUnidade(newValue);
  };

  return (
  <React.Fragment>
    <ThemeProvider theme={defaultTheme}>
      <AppBar/>  
      <Drawer/> 
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
            {request === 'get' ? 'Ligação' : null}
            {request === 'post' ? 'Cadastrar Ligação' : null}
            {request === 'put' ? 'Atualizar Ligação' : null}
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              {request === "post" ? null : <Grid item xs={12}>
              <TextField
                  readOnly = {true}
                  name="id"
                  fullWidth
                  id="id"
                  label="Id"
                  autoComplete={String(data.id)}
                  defaultValue={String(id)}
                />
              </Grid>}
              <Grid item xs={12}>
                <Autocomplete
                  readOnly={request === "get" ? true : false}
                  disablePortal
                  id="insumo"
                  options={data4}
                  getOptionLabel={(option) => option.nome}
                  value={inputValueI}
                  onChange = {handleChangeI}
                  sx={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label="Insumo" />}
                  autoFocus= {request === "get" ? false : true}
                  required= {request === "post" ? true : false}
                  />
              </Grid>
              <Grid item xs={12}>
              <Autocomplete
                disablePortal
                id="unidade"
                options={unidade}
                value={selectedUnidade}
                onChange = {handleSelectionChange}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Unidade" />}
                required= {request === "post" ? true : false}
                readOnly={request === "get" ? true : false}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="40"
                  name="quantidade_ha"
                  fullWidth
                  id="quantidade_ha"
                  label="Quantidade/ha"
                  value={inputValueQ || ''}
                  onChange={handleChangeQ}
                  required= {request === "post" ? true : false}
                  readOnly={request === "get" ? true : false}
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  disablePortal
                  id="id_cultura"
                  options={data3}
                  getOptionLabel={(option) => option.nome}
                  value={inputValueC}
                  onChange = {handleChangeC}
                  sx={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label="Cultura" />}
                  readOnly={request === "get" ? true : false}
                  required= {request === "post" ? true : false}
                  />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  disablePortal
                  id="planejamento_etapa_id"
                  options={data2}
                  getOptionLabel={(option) => option.nome_etapa}
                  value={inputValueE}
                  onChange = {handleChangeE}
                  sx={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label="Etapa" />}
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
                  {request === 'post' ? 'Cadastrar Ligação' : null}
                  {request === 'put' ? 'Atualizar Ligação' : null}
              </Button>
            )}
            <Link  to="/EtapaInsumo/GetPage" style={{color:'white', textDecoration: 'none' }}>
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
    </React.Fragment>
  );
}