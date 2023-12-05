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
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import {useLocation, Link} from 'react-router-dom';
import AppBar from '../SideBar/AppBar';
import Drawer from '../SideBar/Drawer';
//import { Link } from 'react-router-dom';

const defaultTheme = createTheme();

export default function SignUp() {
  const [data, setData] = React.useState([]);
  const [data2, setData2] = React.useState([]);
  const [objetoEncontrado, setObjetoEncontrado] = React.useState(null);
  const [inputValueNE, setInputValueNE] = React.useState('');
  const [inputValueND, setInputValueND] = React.useState('');
  const [inputValueE, setInputValueE] = React.useState('Aguardando');
  const [inputValueP, setInputValueP] = React.useState(null);


  const location = useLocation();

  const state = location.state;
  const { request, id } = state;

  const handleChangeNE = (event) => {
    setInputValueNE(event.target.value);
  };

  const handleChangeE = (event, newValue) => {
    setInputValueE(newValue);
  };

  const handleChangeND = (event) => {
    setInputValueND(event.target.value);
  };

  const handleChangeP = (event, newValue) => {
    setInputValueP(newValue);
  };

  React.useEffect(() => {
    if(request !== 'post'){
    axios.get(`http://localhost:8080/PlanejamentoEtapa/${id}`)
      .then(response => {
        console.log(response.data);
        setData(response.data)
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

  const encontrarObjetoPorIdPlanejamento = (idPlanejamento, array) => {
    return array.find(obj => obj.id === idPlanejamento);
  };

  React.useEffect(() => {
    const objeto = encontrarObjetoPorIdPlanejamento(data.id_planejamento, data2);
    console.log(objeto);
    setObjetoEncontrado(objeto);
  }, [data, data2]);

  React.useEffect(() => {
    if(request !== 'post'){
      console.log(data);
      console.log(objetoEncontrado);
      setInputValueNE(data.nome_etapa);
      setInputValueND(data.numero_dias);
      setInputValueE(data.estado);
      if(objetoEncontrado !== null){
        setInputValueP(objetoEncontrado);
      }
    }
    
  }, [data, request, objetoEncontrado]);
    
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = {
        id: data.get('id'),
        nome_etapa: data.get('nome_etapa'),
        numero_dias: data.get('numero_dias'),
        estado: inputValueE,
        id_planejamento: inputValueP.id,
      };
      console.log(formData.estado);
      switch (request) {
        case 'post':
          axios.post(`http://localhost:8080/PlanejamentoEtapa`, formData)
            .then((response) => {
              console.log('Dados cadastrados com sucesso:', response.data);
              window.location.assign("/Etapa/GetPage");
            })
            .catch((error) => {
              console.error('Erro ao cadastrar dados:', error);
            });
          break;
  
        case 'put':
          
          if(formData.nome_etapa === ''){
            formData.nome_etapa = null;
          }
          if(formData.numero_dias === ''){
            formData.numero_dias = null;
          }
          if(formData.estado === ''){
            formData.estado = null;
          }
          if(formData.id_planejamento === ''){
            formData.id_planejamento = null;
          }
          
          axios.put(`http://localhost:8080/PlanejamentoEtapa`, formData)
            .then((response) => {
              console.log('Dados atualizados com sucesso:', response.data);
              window.location.assign("/Etapa/GetPage");
            })
            .catch((error) => {
              console.error('Erro ao atualizar dados:', error);
            });
          break;
  
        default:
          axios.get(`http://localhost:8080/PlanejamentoEtapa/${id}`)
            .then(response => {
              console.log(response.data);
            })
            .catch(error => {
              console.error('Erro ao carregar os dados da API:', error);
            });
          break;
      }
  };

  const estado = [
    'Aguardando', 
    'Execução', 
    'Concluída', 
    'Desconforme'
  ];

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
            {request === 'get' ? 'Etapa' : null}
            {request === 'post' ? 'Cadastrar Etapa' : null}
            {request === 'put' ? 'Atualizar Etapa' : null}
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
                  readOnly: true
                }}
              />
            </Grid>}
              <Grid item xs={12}>
                <TextField
                  autoComplete="Nome Etapa"
                  name="nome_etapa"
                  fullWidth
                  id="nome_etapa"
                  label="Nome Etapa"
                  value={inputValueNE || ''}
                  onChange={handleChangeNE}
                  readOnly={request === "get" ? true : false}
                  required= {request === "post" ? true : false}
                  autoFocus= {request === "get" ? true : false}
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  disablePortal
                  id="estado"
                  options={estado}
                  value={inputValueE}
                  onChange = {handleChangeE}
                  sx={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label="Estado" />}
                  readOnly={request === "get" ? true : false}
                  required= {request === "post" ? true : false}
                  />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="numero_dias"
                  label="Número de dias"
                  name="numero_dias"
                  autoComplete="0"
                  value={inputValueND || ''}
                  onChange={handleChangeND}
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
                  {request === 'post' ? 'Cadastrar Etapa' : null}
                  {request === 'put' ? 'Atualizar Etapa' : null}
              </Button>
            )}
            <Link  to="/Etapa/GetPage" style={{color:'white', textDecoration: 'none' }}>
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