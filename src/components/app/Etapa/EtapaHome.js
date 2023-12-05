import React, { useEffect, useState } from 'react';
//import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EditIcon from '@mui/icons-material/Edit';
import Title from '../Title';
import axios from 'axios';
import { Link} from 'react-router-dom';
import Box from '@mui/material/Box';
import DeletePopUp from '../CRUD/DeletePopUp';

export default function Orders() {
  const [data, setData] = useState([]);


  useEffect(() => {
    axios.get('http://localhost:8080/PlanejamentoEtapa')
      .then(response => {
        console.log(response.data);
        setData(response.data)
      })
      .catch(error => {
        console.error('Erro ao carregar os dados da API:', error);
      });
  }, []);

  /*function preventDefault(event) {
    event.preventDefault();
  }*/

  return (
    <React.Fragment>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          mb: 3,
        }}
      >
        <Box>
          <Title>Etapa</Title>
        </Box>
        <Box>
          <Link to={`/Etapa/Form`} state={{ request: 'post', id: '1' }} style={{ color: 'white', textDecoration: 'none' }}>
            <Button variant="contained" sx={{ width: '100px' }}>
              Cadastrar
            </Button>
          </Link>
        </Box>
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell> <div style={{ textAlign: 'center' }}> ID </div></TableCell>
            <TableCell> <div style={{ textAlign: 'center' }}> Nome Etapa </div></TableCell>
            <TableCell> <div style={{ textAlign: 'center' }}> Número de Dias </div></TableCell>
            <TableCell> <div style={{ textAlign: 'center' }}> Estado </div></TableCell>
            <TableCell> <div style={{ textAlign: 'center' }}> Ações </div></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((data) => (
            <TableRow key={data.id}>
              <TableCell> <div style={{ textAlign: 'center' }}> {data.id} </div></TableCell>
              <TableCell> <div style={{ textAlign: 'center' }}> {data.nome_etapa} </div></TableCell>
              <TableCell> <div style={{ textAlign: 'center' }}> {data.numero_dias} </div></TableCell>
              <TableCell> <div style={{ textAlign: 'center' }}> {data.estado} </div></TableCell>
              <TableCell> <div style={{ textAlign: 'center' }}>
                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                  <Link to={`/Etapa/Form`} state={{ request: 'get', id: data.id }} style={{ textDecoration: 'none' }}>
                    <Button>
                      <AssignmentIcon />
                    </Button>
                  </Link>
                  <Link to={`/Etapa/Form`} state={{ request: 'put', id: data.id }} style={{ textDecoration: 'none' }}>
                    <Button>
                      <EditIcon />
                    </Button>
                  </Link>
                    <DeletePopUp request="PlanejamentoEtapa" id={data.id} />
                </ButtonGroup> </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/*<Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
          </Link>*/}
    </React.Fragment>
  );
}
