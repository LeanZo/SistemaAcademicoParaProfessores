import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { Button } from '@material-ui/core';
import DiscAlunoAdd from './DiscAlunoAdd';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';
import FirebaseService from '../services/FirebaseService';

const useStyles = makeStyles({
  root: {
    overflowX: 'auto',
    marginRight: '20px',
    marginLeft: '20px',
    marginTop: '20px'
  },
  table: {
    minWidth: 650,
  },
});

const remove = (id, turmakey) => {
  FirebaseService.remove(id, 'turma/' + turmakey + '/alunos');
};

export default function DiscAlunoTable(props) {
  const classes = useStyles();

  let rows = [];
  
  if(props.turma.alunos){
    let alunos = Object.values(props.turma.alunos);
     alunos.map(aluno => rows.push(aluno));
  }

  return (
    <React.Fragment>
    <Paper className={classes.root}>
      <Box style={{marginTop: '5px', marginBottom: '5px'}}>
        <DiscAlunoAdd turma={props.turma}/>
      </Box>
      <Table className={classes.table} aria-label="Alunos">
        <TableHead>
          <TableRow>
            <TableCell>Matricula</TableCell>
            <TableCell align="left">Nome</TableCell>
            <TableCell align="right">Presenças</TableCell>
            <TableCell align="right">AV1</TableCell>
            <TableCell align="right">AV2</TableCell>
            <TableCell align="right">AVS</TableCell>
            <TableCell align="right">AVF</TableCell>
            <TableCell align="right">Remover</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.matricula}>
              <TableCell component="th" scope="row">
                {row.matricula}
              </TableCell>
              <TableCell align="left">{row.nome}</TableCell>
              <TableCell align="right">{row.presencas}</TableCell>
              <TableCell align="right">{row.nota_av1}</TableCell>
              <TableCell align="right">{row.nota_av2}</TableCell>
              <TableCell align="right">{row.nota_avs}</TableCell>
              <TableCell align="right">{row.nota_avf}</TableCell>
              <TableCell align="right"><IconButton onClick={() => remove(row.matricula, props.turma.key)}><DeleteIcon /></IconButton></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
    </React.Fragment>
  );
}