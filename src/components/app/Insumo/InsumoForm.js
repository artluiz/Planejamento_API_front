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
  const [inputValueN, setInputValueN] = React.useState('');
  const [inputValueC, setInputValueC] = React.useState('');
  const [inputValueD, setInputValueD] = React.useState('');
  const [inputValueP, setInputValueP] = React.useState('');
  const [inputValueG, setInputValueG] = React.useState('');
  const [selectedItemClasse, setSelectedItemClasse] = React.useState(null);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [inputValuePR, setInputValuePR] = React.useState('');
  const [selectedItemUnidade, setSelectedItemUnidade] = React.useState(null);


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

  const handleChangeD = (event) => {
    setInputValueD(event.target.value);
  };

  const handleChangeP = (event) => {
    setInputValueP(event.target.value);
  };

  const handleChangeG = (event) => {
    setInputValueG(event.target.value);
  };

  const handleChangePR = (event) => {
    setInputValuePR(event.target.value);
  };


  React.useEffect(() => {
    if(request !== 'post'){
      axios.get(`http://localhost:8080/insumos/${id}`)
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
    if(request !== 'post'){
      console.log(data);
      setInputValueN(data.nome);
      setInputValueC(data.codigo);
      setInputValueD(data.descricao);
      setInputValueP(data.principio_ativo);
      setInputValueG(data.grupo);
      setSelectedItemClasse(data.subclasse);
      setSelectedItem(data.fabricante);
      setInputValuePR(data.preco);
      setSelectedItemUnidade(data.unidade);
    }
    
  }, [data, request]);
    
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = {
        id: data.get('id'),
        nome: data.get('nome'),
        codigo: data.get('codigo'),
        descricao: data.get('descricao'),
        principio_ativo: data.get('principio_ativo'),
        grupo: data.get('grupo'),
        subclasse: selectedItemClasse,
        fabricante: selectedItem,
        preco: data.get('preco'),
        unidade: selectedItemUnidade,
      };

      switch (request) {
        case 'post':
          axios.post(`http://localhost:8080/insumos`, formData)
            .then((response) => {
              console.log('Dados cadastrados com sucesso:', response.data);
              window.location.assign("/Insumo/GetPage");
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
          if(formData.descricao === ''){
            formData.descricao = null;
          }
          if(formData.principio_ativo === ''){
            formData.principio_ativo = null;
          }
          if(formData.grupo === ''){
            formData.grupo = null;
          }
          if(formData.classe === ''){
            formData.classe = null;
          }
          if(formData.fabricante === ''){
            formData.fabricante = null;
          }
          if(formData.preco === '' || formData.preco < 0){
            formData.preco = null;
          }
          if(formData.unidade === ''){
            formData.unidade = null;
          }
          
          axios.put(`http://localhost:8080/insumos`, formData)
            .then((response) => {
              console.log('Dados atualizados com sucesso:', response.data);
              window.location.assign("/Insumo/GetPage");
            })
            .catch((error) => {
              console.error('Erro ao atualizar dados:', error);
            });
          break;
  
        case 'delete':
          axios.delete(`http://localhost:8080/insumos/inativar/${id}`, formData)
            .then((response) => {
              console.log('Dados atualizados com sucesso:', response.data);
              window.location.assign("/Insumo/GetPage");
            })
            .catch((error) => {
              console.error('Erro ao atualizar dados:', error);
            });
          break;
  
        default:
          axios.get(`http://localhost:8080/insumos/${id}`)
            .then(response => {
              console.log(response.data);
            })
            .catch(error => {
              console.error('Erro ao carregar os dados da API:', error);
            });
          break;
      }
    };

  const fabricante = [
    'BAYER',
    'HERINGER',
  ];
  const classe = [
    'ADJUVANTE',
    'ADUBO_FOLIAR',
    'SELETIVO',
  ];
  const unidade = [
    'KG',
    'L',
  ];

  const handleSelectionChange = (event, newValue) => {
    setSelectedItem(newValue);
  };
  const handleSelectionChangeClasse = (event, newValue) => {
    setSelectedItemClasse(newValue);
  };
  const handleSelectionChangeUnidade = (event, newValue) => {
    setSelectedItemUnidade(newValue);
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
            {request === 'get' ? 'Insumo' : null}
            {request === 'post' ? 'Cadastrar Insumo' : null}
            {request === 'put' ? 'Atualizar Insumo' : null}
            {request === 'delete' ? 'Apagar Insumo' : null}
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
                name="nome"
                fullWidth
                id="nome"
                label="Nome"
                value={inputValueN || ''}
                onChange={handleChangeN}
                readOnly={request === "get" ? true : false}
                required= {request === "post" ? true : false}
                autoFocus= {request === "get" ? true : false}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="codigo"
                fullWidth
                id="codigo"
                label="Codigo"
                value={inputValueC || ''}
                onChange={handleChangeC}
                readOnly={request === "get" ? true : false}
                required= {request === "post" ? true : false}
              />
            </Grid>
            <Grid item xs={12}>
            <TextField
                name="descricao"
                fullWidth
                id="descricao"
                label="Descrição"
                value={inputValueD || ''}
                onChange={handleChangeD}
                readOnly={request === "get" ? true : false}
                required= {request === "post" ? true : false}
              />
              </Grid>
              <Grid item xs={12}>
              <TextField
                name="principio_ativo"
                fullWidth
                id="principio_ativo"
                label="Princípio Ativo"
                value={inputValueP || ''}
                onChange={handleChangeP}
                readOnly={request === "get" ? true : false}
                required= {request === "post" ? true : false}
              />
              </Grid>
              <Grid item xs={12}>
              <TextField
                name="grupo"
                fullWidth
                id="grupo"
                label="Grupo"
                value={inputValueG || ''}
                onChange={handleChangeG}
                readOnly={request === "get" ? true : false}
                required= {request === "post" ? true : false}
              />
              </Grid>
              <Grid item xs={12}>
              <Autocomplete
                disablePortal
                id="subclasse"
                options={classe}
                value={selectedItemClasse}
                onChange = {handleSelectionChangeClasse}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Classe" />}
                readOnly={request === "get" ? true : false}
                required= {request === "post" ? true : false}
                />
              </Grid>
              <Grid item xs={12}>
              <Autocomplete
                disablePortal
                id="fabricante"
                options={fabricante}
                value={selectedItem}
                onChange = {handleSelectionChange}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Fabricante" />}
                readOnly={request === "get" ? true : false}
                required= {request === "post" ? true : false}
                />
              </Grid>
              <Grid item xs={12}>
              <TextField
                name="preco"
                fullWidth
                id="preco"
                label="Preço"
                value={inputValuePR || ''}
                onChange={handleChangePR}
                readOnly={request === "get" ? true : false}
                required= {request === "post" ? true : false}
              />
              </Grid>
              <Grid item xs={12}>
              <Autocomplete
                disablePortal
                id="unidade"
                options={unidade}
                value={selectedItemUnidade}
                onChange = {handleSelectionChangeUnidade}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Unidade" />}
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
                  {request === 'post' ? 'Cadastrar Insumo' : null}
                  {request === 'put' ? 'Atualizar Insumo' : null}
                  {request === 'delete' ? 'Apagar Insumo' : null}
              </Button>
            )}
            <Link  to="/Insumo/GetPage" style={{color:'white', textDecoration: 'none' }}>
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