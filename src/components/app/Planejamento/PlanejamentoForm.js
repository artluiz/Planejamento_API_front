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
import {DatePicker, LocalizationProvider} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import {useLocation, Link} from 'react-router-dom';
import AppBar from '../SideBar/AppBar';
import Drawer from '../SideBar/Drawer';
import Autocomplete from '@mui/material/Autocomplete';
//import { Link } from 'react-router-dom';
dayjs.extend(localizedFormat);

const defaultTheme = createTheme();

export default function SignUp() {
  const [data, setData] = React.useState([]);
  const [data2, setData2] = React.useState([]);
  const [inputValueA, setInputValueA] = React.useState('');
  const [inputValueN, setInputValueN] = React.useState('');
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [objetoEncontrado, setObjetoEncontrado] = React.useState(null);
  const [objetoEncontrado2, setObjetoEncontrado2] = React.useState(null);
  const [inputValueCA, setInputValueCA] = React.useState('');
  const [inputValueC, setInputValueC] = React.useState('');
  const [inputValueE, setInputValueE] = React.useState('');
  const [dateRange, setDateRange] = React.useState([null, null]);

  const handleDateRangeChange = (newDates) => {

    const [startDate, endDate] = newDates;
    if (startDate > endDate) {
      return;
    }
    setDateRange(newDates);
  };

  const location = useLocation();

  const state = location.state;
  console.log(location)
  const { request, id } = state;

  const dayjs = require('dayjs');

  const handleChangeA = (event) => {
    setInputValueA(event.target.value);
  };

  const handleChangeN = (event) => {
    setInputValueN(event.target.value);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };
  
  const handleChangeCA = (event, newValue) => {
    setInputValueCA(newValue);
  };

  const handleChangeC = (event, newValue) => {
    setInputValueC(newValue);
  };

  const handleChangeE = (event) => {
    setInputValueE(event.target.value);
  };

  React.useEffect(() => {
    if(request !== 'post'){
      axios.get(`http://localhost:8080/planejamento/${id}`)
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
    axios.get('http://localhost:8080/cultura/Nome')
      .then(response => {
        console.log(response.data);
        setData2(response.data)
      })
      .catch(error => {
        console.error('Erro ao carregar os dados da API:', error);
      });
  }, [request]);

  React.useEffect(() => {
    if(request !== 'post'){
      console.log(data);
      setInputValueA(data.area_plantio);
      setInputValueN(data.nome_etapa);
      handleStartDateChange(dayjs(data.data_comeco));
      handleEndDateChange(dayjs(data.data_colheita));
      if(objetoEncontrado !== null){
        setInputValueCA(objetoEncontrado);
      }
      if(objetoEncontrado2 !== null){
        setInputValueC(objetoEncontrado2);
      }
      setInputValueE(data.etapas);
    }
    
  }, [data, request, dayjs, objetoEncontrado, objetoEncontrado2]);
    
    
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = {
        id: data.get('id'),
        area_plantio: data.get('area_plantio'),
        nome_etapa: data.get('nome_etapa'),
        data_comeco: startDate.format('YYYY-MM-DD'),
        data_colheita: endDate.format('YYYY-MM-DD'),
        id_cultura_anterior: inputValueCA.id,
        id_cultura: inputValueC.id,
        id_etapas: data.get('etapas'),
      };

      switch (request) {
        case 'post':
          axios.post(`http://localhost:8080/planejamento`, formData)
            .then((response) => {
              console.log('Dados cadastrados com sucesso:', response.data);
              window.location.assign("/Planejamento/GetPage");
            })
            .catch((error) => {
              console.error('Erro ao cadastrar dados:', error);
            });
          break;
  
        case 'put':
          
          if(formData.area_plantio === ''){
            formData.area_plantio = null;
          }
          if(formData.nome_etapa === ''){
            formData.nome_etapa = null;
          }
          if(formData.data_comeco === ''){
            formData.data_comeco = null;
          }
          if(formData.nome === ''){
            formData.nome = null;
          }
          if(formData.id_cultura_anterior < 0 || formData.id_cultura_anterior === ''){
            formData.id_cultura_anterior = null;
          }
          if(formData.id_planejamento === ''){
            formData.id_planejamento = null;
          }
          
          axios.put(`http://localhost:8080/planejamento`, formData)
            .then((response) => {
              console.log('Dados atualizados com sucesso:', response.data);
              window.location.assign("/Planejamento/GetPage");
            })
            .catch((error) => {
              console.error('Erro ao atualizar dados:', error);
            });
          break;
  
        default:
          axios.get(`http://localhost:8080/planejamento/${id}`)
            .then(response => {
              console.log(response.data);
            })
            .catch(error => {
              console.error('Erro ao carregar os dados da API:', error);
            });
          break;
      }
  };

  const encontrarObjetoPorIdCulturaAnte = (idCulturaAnterior, array) => {
    return array.find(obj => obj.id === idCulturaAnterior);
  };

  const encontrarObjetoPorIdCultura = (idCultura, array) => {
    return array.find(obj => obj.id === idCultura);
  };

  React.useEffect(() => {
    const objeto = encontrarObjetoPorIdCulturaAnte(data.id_cultura_anterior, data2);
    console.log(objeto);
    setObjetoEncontrado(objeto);
  }, [data, data2]);

  React.useEffect(() => {
    const objeto = encontrarObjetoPorIdCultura(data.id_cultura, data2);
    console.log(objeto);
    setObjetoEncontrado2(objeto);
  }, [data, data2]);

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
            {request === 'get' ? 'Planejamento' : null}
            {request === 'post' ? 'Cadastrar Planejamento' : null}
            {request === 'put' ? 'Atualizar Planejamento' : null}
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
                fullWidth
                id="area_plantio"
                label="Area Plantio em hectares"
                name="area_plantio"
                autoComplete="0"
                value={inputValueA || ''}
                onChange={handleChangeA}
                InputProps={{
                  readOnly: request !== "get" ? false : true,
                  required: request === "post" ? true : false
                }}
              />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="Nome Etapa"
                  name="nome_etapa"
                  fullWidth
                  id="nome_etapa"
                  label="Nome Etapa"
                  value={inputValueN || ''}
                  onChange={handleChangeN}
                  InputProps={{
                    readOnly: request !== "get" ? false : true,
                    required: request === "post" ? true : false
                  }}
                  
                />
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    format='DD-MM-YYYY'
                    readOnly={request === "get" ? true : false}
                    id="data_comeco"
                    name="data_comeco"
                    required
                    label="Data de Começo"
                    fullWidth
                    slotProps={{ textField: { variant: 'outlined' } }}
                    value={startDate}
                    onChange={handleStartDateChange}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    format='DD-MM-YYYY'
                    readOnly={request === "get" ? true : false}
                    id="data_colheita"
                    name="data_colheita"
                    required
                    label="Data de Colheita"
                    fullWidth
                    slotProps={{ textField: { variant: 'outlined' } }}
                    value={endDate}
                    onChange={handleEndDateChange}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateRangePicker
                    value={dateRange}
                    onChange={handleDateRangeChange}
                    readOnly={request === "get" ? true : false}
                    renderInput={(startProps, endProps) => (
                      <>
                        <DatePicker
                          {...startProps}
                          id="data_comeco"
                          name="data_comeco"
                          label="Data de Começo"
                          renderInput={(startProps) => <input {...startProps.inputProps} />}
                        />
                        <DatePicker
                          {...endProps}
                          id="data_colheita"
                          name="data_colheita"
                          label="Data de Colheita"
                          renderInput={(endProps) => <input {...endProps.inputProps} />}
                        />
                      </>
                    )}
                    localeText={{ start: 'Check-in', end: 'Check-out' }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  disablePortal
                  id="id_cultura_anterior"
                  options={data2}
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
                  id="id_cultura"
                  options={data2}
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
                <TextField
                  fullWidth
                  name="etapas"
                  label="Etapas"
                  type="etapas"
                  id="etapas"
                  autoComplete="0"
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
                {request === 'post' ? 'Cadastrar Planejamento' : null}
                {request === 'put' ? 'Atualizar Planejamento' : null}
              </Button>
            )}
            <Link  to="/Planejamento/GetPage" style={{color:'white', textDecoration: 'none' }}>
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