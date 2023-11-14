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
//import { Link } from 'react-router-dom';

const defaultTheme = createTheme();

export default function SignUp() {
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [selectedItemClasse, setSelectedItemClasse] = React.useState(null);
  const [selectedItemUnidade, setSelectedItemUnidade] = React.useState(null);
    
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = {
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

      axios.post(`http://localhost:8080/insumos`, formData)
            .then((response) => {
            console.log('Dados removidos com sucesso:', response.data);
            })
            .catch((error) => {
            console.error('Erro ao remover dados:', error);
        });
        window.location.reload();
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
            Cadastrar Insumo
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
            
              <TextField
                autoFocus
                name="nome"
                required
                fullWidth
                id="nome"
                label="Nome"
              />
            </Grid>
            <Grid item xs={12}>
            <TextField
                required
                fullWidth
                id="codigo"
                label="Codigo"
                name="codigo"
              />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="descricao"
                  required
                  fullWidth
                  id="descricao"
                  label="Descrição"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="principio_ativo"
                  label="Principio Ativo"
                  name="principio_ativo"
                  autoComplete="0"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="grupo"
                  label="Grupo"
                  type="grupo"
                  id="grupo"
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
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="preco"
                  label="Preço"
                  type="preco"
                  id="preco"
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
            Cadastrar
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </React.Fragment>
  );
}