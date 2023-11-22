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
import { Link} from 'react-router-dom';

export default function Orders() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/cultura')
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
      <Title>Culturas</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>Preço de Venda</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((data) => (
            <TableRow key={data.id}>
              <TableCell>{data.id}</TableCell>
              <TableCell>{data.nome}</TableCell>
              <TableCell>{data.preco_venda}</TableCell>
              <TableCell>
                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                  <Link to={`/Cultura/Form`} state={{ request: 'get', id: data.id }} style={{ textDecoration: 'none' }}>
                    <Button>
                      <AssignmentIcon />
                    </Button>
                  </Link>
                  <Link to={`/Cultura/Form`} state={{ request: 'put', id: data.id }} style={{ textDecoration: 'none' }}>
                    <Button>
                      <EditIcon />
                    </Button>
                  </Link>
                  <Link to={`/Cultura/Form`} state={{ request: 'post', id: data.id }} style={{ textDecoration: 'none' }}>
                    <Button>
                      <DeleteIcon />
                    </Button>
                  </Link>
                </ButtonGroup>
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
