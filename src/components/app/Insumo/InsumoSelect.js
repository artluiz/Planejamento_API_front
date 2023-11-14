
import Title from '../Title';
import axios from 'axios';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function InsumoSelect(ifID) {

  const [data, setData] = React.useState([]);
  const [selectedItem, setSelectedItem] = React.useState(null);

  React.useEffect(() => {
    axios.get('http://localhost:8080/insumos')
      .then(response => {
        console.log(response.data);
        setData(response.data)
      })
      .catch(error => {
        console.error('Erro ao carregar os dados da API:', error);
      });
  }, []);

  const handleSelectionChange = (event, newValue) => {
    setSelectedItem(newValue);
  };

  return (
    <React.Fragment>
    <Title>Planejamento</Title>
        <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={data.map((data) => data.nome)}
        value={selectedItem}
        onChange={handleSelectionChange}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Insumo" />}
        />
        {selectedItem && (
            <div>
            <Title>Dados do Insumo Selecionado</Title>
            {ifID === 1 ? <p>ID: {data.find(item => item.nome === selectedItem).id}</p> : null}
            <p>Nome: {selectedItem}</p>
            <p>Codigo: {data.find(item => item.nome === selectedItem).codigo}</p>
            <p>Descrição: {data.find(item => item.nome === selectedItem).descricao}</p>
            <p>Princípio Ativo: {data.find(item => item.nome === selectedItem).principio_ativo}</p>
            <p>Grupo: {data.find(item => item.nome === selectedItem).grupo}</p>
            <p>Classe: {data.find(item => item.nome === selectedItem).subclasse}</p>
            <p>Fabricante: {data.find(item => item.nome === selectedItem).fabricante}</p>
            <p>Preço: {data.find(item => item.nome === selectedItem).preco}</p>
            <p>Unidade: {data.find(item => item.nome === selectedItem).unidade}</p>
            </div>
        )}
    </React.Fragment>
  );
}
