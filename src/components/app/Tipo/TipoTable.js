import React, { useEffect, useState } from 'react';
//import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../Title';
import axios from 'axios';

export default function Orders() {
  const [data, setData] = useState([]);


  useEffect(() => {
    axios.get('http://localhost:8080/tipo')
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
      <Title>Tipos de Planejamento</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Codigo</TableCell>
            <TableCell>Nome Etapa</TableCell>
            <TableCell>Número de Dias</TableCell>
            <TableCell>ID Insumo</TableCell>
            <TableCell>Unidade</TableCell>
            <TableCell>Quantidade/ha</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((data) => (
            <TableRow key={data.id}>
              <TableCell>{data.id}</TableCell>
              <TableCell>{data.codigo}</TableCell>
              <TableCell>{data.nome_etapa}</TableCell>
              <TableCell>{data.numero_dias}</TableCell>
              <TableCell>{data.id_insumo}</TableCell>
              <TableCell>{data.unidade}</TableCell>
              <TableCell>{data.quantidade_ha}</TableCell>
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
