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
import DeleteIcon from '@mui/icons-material/Delete';
import Title from '../Title';
import axios from 'axios';
import Box from '@mui/material/Box';
import { Link} from 'react-router-dom';

export default function Orders() {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);


  useEffect(() => {
    axios.get('http://localhost:8080/InsumoCultura')
      .then(response => {
        console.log(response.data);
        setData(response.data)
      })
      .catch(error => {
        console.error('Erro ao carregar os dados da API:', error);
      });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:8080/cultura/Nome')
      .then(response => {
        console.log(response.data);
        setData2(response.data)
      })
      .catch(error => {
        console.error('Erro ao carregar os dados da API:', error);
      });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:8080/insumos/Nome')
      .then(response => {
        console.log(response.data);
        setData3(response.data)
      })
      .catch(error => {
        console.error('Erro ao carregar os dados da API:', error);
      });
  }, []);

  const encontrarObjetoPorIdCultura = (idCultura, array) => {
    return array.find(obj => obj.id === idCultura);
  };

  const encontrarObjetoPorIdInsumo = (idInsumo, array) => {
    return array.find(obj => obj.id === idInsumo);
  };

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
        <Title>Ligação Insumo Etapa</Title>
      </Box>
      <Box>
        <Link to={`/InsumoCultura/Form`} state={{ request: 'post', id: '1' }} style={{ color: 'white', textDecoration: 'none' }}>
          <Button variant="contained" sx={{ width: '100px' }}>
            Cadastrar
          </Button>
        </Link>
      </Box>
    </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell><div style={{ textAlign: 'center' }}> ID </div></TableCell>
            <TableCell><div style={{ textAlign: 'center' }}> Insumo </div></TableCell>
            <TableCell><div style={{ textAlign: 'center' }}> Quantidade/HA </div></TableCell>
            <TableCell><div style={{ textAlign: 'center' }}> Cultura </div></TableCell>
            <TableCell><div style={{ textAlign: 'center' }}> Ações </div></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((data) => (
            <TableRow key={data.id}>
              <TableCell><div style={{ textAlign: 'center' }}> {data.id} </div></TableCell>
              <TableCell><div style={{ textAlign: 'center' }}> {encontrarObjetoPorIdInsumo(data.id_insumo, data3)?.nome} </div></TableCell>
              <TableCell><div style={{ textAlign: 'center' }}> {data.quantidade_ha} </div></TableCell>
              <TableCell><div style={{ textAlign: 'center' }}> {encontrarObjetoPorIdCultura(data.id_cultura, data2)?.nome} </div></TableCell>
              <TableCell> <div style={{ textAlign: 'center' }}>
                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                  <Link to={`/InsumoCultura/Form`} state={{ request: 'get', id: data.id , data: data}} style={{ textDecoration: 'none' }}>
                    <Button>
                      <AssignmentIcon />
                    </Button>
                  </Link>
                  <Link to={`/InsumoCultura/Form`} state={{ request: 'put', id: data.id }} style={{ textDecoration: 'none' }}>
                    <Button>
                      <EditIcon />
                    </Button>
                  </Link>
                  <Link to={`/InsumoCultura/Form`} state={{ request: 'delete', id: data.id }} style={{ textDecoration: 'none' }}>
                    <Button>
                      <DeleteIcon />
                    </Button>
                  </Link>
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
