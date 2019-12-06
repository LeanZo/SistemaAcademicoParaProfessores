import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {FormControl, MenuItem, InputLabel, Select} from '@material-ui/core';
import { defaultProps } from 'recompose';
import FirebaseService from "../services/FirebaseService";

export default function DiscAlunoAdd(props) {
  const [open, setOpen] = React.useState(false);
  const [alunoKey, setAlunoKey] = React.useState();
  const [alunoNome, setAlunoNome] = React.useState();
  const [dbaluno, setDbAluno] = React.useState([]);

  React.useEffect(() => 
    FirebaseService.getDataList('aluno', (dataReceived) => setDbAluno(dataReceived)), []
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseAdd = () => {
    let objToSubmit = {
        matricula: alunoKey,
        nome: alunoNome,
        nota_av1: 'N/A',
        nota_av2: 'N/A',
        nota_avs: 'N/A',
        nota_avf: 'N/A',
        presencas: '0'
    }
    FirebaseService.pushData('turma/' + props.turma.key + '/alunos', alunoKey, objToSubmit);
    setOpen(false);
  };

  const handleChange = event => {
    dbaluno.map((item, index) => {
        if(item.key == event.target.value){   
            setAlunoKey(item.key);
            setAlunoNome(item.nome);
        }
    })
  }

  return (
    <div>
      <Button variant="text" color="primary" style={{float: 'right', marginRight: '20px'}} onClick={handleClickOpen}>
        Adicionar Aluno à Turma
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Adicionar Aluno à Turma</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Selecione o aluno que deseja adicionar à turma {props.turma.key} e clique em adicionar.
          </DialogContentText>
            <FormControl fullWidth='true' margin='normal'>
                <InputLabel id="discalunoadd-label">Aluno</InputLabel>
                <Select
                    labelId="discalunoadd-label"
                    id="discalunoadd-select"
                    required
                    value={alunoKey}
                    onChange={handleChange}>
                <MenuItem value="">
                    <em>Nenhum</em>
                </MenuItem>
                    {
                        dbaluno.map((item, index) =>
                            <MenuItem key={item.key} value={item.key}>{item.nome}</MenuItem>
                        )
                    }
                </Select>
            </FormControl>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button color="primary" onClick={handleCloseAdd}>
            Adicionar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}