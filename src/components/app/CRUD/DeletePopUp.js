import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const DeletePopUp = ({ request, id }) => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmDelete = async () => {
    axios.delete(`http://localhost:8080/${request}/inativar/${id}`)
      .then((response) => {
        console.log('Dados atualizados com sucesso:', response.data);
        window.location.assign("/Cultura/GetPage");
      })
      .catch((error) => {
        console.error('Erro ao atualizar dados:', error);
      });

    handleCloseDialog();
  };

  return (
    <div>
      <Button onClick={handleOpenDialog}>
        <DeleteIcon />
      </Button>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza de que deseja excluir este item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleConfirmDelete} variant="contained" color="error">
            Confirmar Exclusão
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeletePopUp;
