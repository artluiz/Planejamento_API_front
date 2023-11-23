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
    axios.get('http://localhost:8080/plantio')
      .then(response => {
        console.log(response.data);
        setData(response.data);
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
      <Title>Plantios</Title>
      <Link  to={`/Plantio/Form`} state={{ request: 'post', id: '1' }} style={{color:'white', textDecoration: 'none' }}>
        <Button
        variant="contained"
        sx={{mt: 3,
          mb: 2,
          width: '100px',
          alignSelf: 'flex-end'}}
        >
          Cadastrar
        </Button>
      </Link>
      <Table size="small" >
        <TableHead >
          <TableRow >
            <TableCell> <div style={{ textAlign: 'center' }}> ID </div></TableCell>
            <TableCell> <div style={{ textAlign: 'center' }}> Nome </div></TableCell>
            <TableCell> <div style={{ textAlign: 'center' }}> Ações </div></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((data) => (
            <TableRow key={data.id}>
              <TableCell> <div style={{ textAlign: 'center' }}> {data.id} </div> </TableCell>
              <TableCell> <div style={{ textAlign: 'center' }}> {data.nome} </div> </TableCell>
              <TableCell> <div style={{ textAlign: 'center' }}>
                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                  <Link to={`/Plantio/Form`} state={{ request: 'get', id: data.id }} style={{ textDecoration: 'none' }}>
                    <Button>
                      <AssignmentIcon />
                    </Button>
                  </Link>
                  <Link to={`/Plantio/Form`} state={{ request: 'put', id: data.id }} style={{ textDecoration: 'none' }}>
                    <Button>
                      <EditIcon />
                    </Button>
                  </Link>
                  <Link to={`/Plantio/Form`} state={{ request: 'delete', id: data.id }} style={{ textDecoration: 'none' }}>
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
