import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const items = [
  { name: 'Item 1' },
  { name: 'Item 2' },
  { name: 'Item 3' },
  // ... (lista de itens do banco de dados)
];

const AutocompleteComponent = () => {
  const [inputValue, setInputValue] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
  };

  const handleItemChange = (event, newValue) => {
    setSelectedItem(newValue);
  };

  return (
    <div style={{ width: 300, margin: 'auto', marginTop: 50 }}>
      <Autocomplete
        value={selectedItem}
        onChange={handleItemChange}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        options={items}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField {...params} label="Selecione um item" variant="outlined" />
        )}
      />
      {selectedItem && (
        <div style={{ marginTop: 20 }}>
          <strong>Item Selecionado:</strong> {selectedItem.name}
        </div>
      )}
    </div>
  );
};

export default AutocompleteComponent;