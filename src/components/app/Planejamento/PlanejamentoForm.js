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
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
//import { Link } from 'react-router-dom';
dayjs.extend(localizedFormat);

const defaultTheme = createTheme();

export default function SignUp() {
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };
    
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = {
        area_plantio: data.get('area_plantio'),
        nome_etapa: data.get('nome_etapa'),
        data_comeco: startDate.format('YYYY-MM-DD'),
        data_colheita: endDate.format('YYYY-MM-DD'),
        id_cultura_anterior: data.get('id_cultura_anterior'),
        id_cultura: data.get('id_cultura'),
      };

      axios.post('http://localhost:8080/planejamento', formData)
        .then((response) => {
        console.log('Dados atualizados com sucesso:', response.data);
      })
        .catch((error) => {
        console.error('Erro ao atualizar dados:', error);
      });
      window.location.reload();
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
            Cadastrar Planejamento
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
            <TextField
                autoFocus
                required
                fullWidth
                id="area_plantio"
                label="Area Plantio"
                name="area_plantio"
                autoComplete="0"
              />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="Nome Etapa"
                  name="nome_etapa"
                  required
                  fullWidth
                  id="nome_etapa"
                  label="Nome Etapa"
                />
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
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
                <TextField
                  required
                  fullWidth
                  id="id_cultura_anterior"
                  label="ID Cultura Anterior"
                  name="id_cultura_anterior"
                  autoComplete="0"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="id_cultura"
                  label="ID Cultura"
                  type="id_cultura"
                  id="id_cultura"
                  autoComplete="0"
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