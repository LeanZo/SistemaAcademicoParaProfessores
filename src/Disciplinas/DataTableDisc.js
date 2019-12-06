import React from 'react';
import {Button, Table, TableBody, TableCell, TableHead, TableRow, Typography, Box} from "@material-ui/core";
import FirebaseService from '../services/FirebaseService';
import {Link} from 'react-router-dom';
import {urls, privateUrls} from "../urlUtils";
import red from '@material-ui/core/colors/red';
import {MuiThemeProvider} from "@material-ui/core/styles/index";
import {createMuiTheme} from '@material-ui/core/styles';
import App from "../App";
import DiscAlunoDialog from './DiscAlunoDialog';

const theme = createMuiTheme({
    palette: {
        primary: red,
    },
  });

const countAlunos = (alunos) => {
    if(alunos)
        return Object.values(alunos).length;
    else
        return 0;
}

export const DataTableDisc = ({data}) => {
    const remove = (id) => {
        FirebaseService.remove(id, 'turma');
    };
    App.setCardSize();
    return <React.Fragment>
        <Typography variant="headline" component="h2">Turmas</Typography>
        <Box style={{marginTop: '5px'}}>
            <Button color="primary" variant="outlined" component={props => <Link to={privateUrls.home.path} {...props}/>}>
                Voltar
            </Button>
            <Button style={{ float: "right" }} color="primary" variant="contained" component={props => <Link to={privateUrls.addDisc.path} {...props}/>}>
                Adicionar nova turma
            </Button>
        </Box>
        <Table selectable={false}>
            <TableHead>
                <TableRow>
                    <TableCell>Nome</TableCell>
                    <TableCell>Professor</TableCell>
                    <TableCell align="center">Quantidade de alunos</TableCell>
                    <TableCell>Ações</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    data.map((item, index) =>
                        <TableRow key={index}>
                            <TableCell>{item.key}</TableCell>
                            <TableCell>{item.mat_professor}</TableCell>
                            <TableCell align="center">{countAlunos(item.alunos)}</TableCell>
                            <TableCell>
                                <DiscAlunoDialog turma={item}/>
                                <Button component={props => <Link to={privateUrls.editDisc.pathWithouParam + item.key} {...props}/>}>
                                    Editar
                                </Button>
                                <MuiThemeProvider theme={theme}>
                                    <Button color = 'primary'
                                    onClick={() => remove(item.key)}>
                                        Remover
                                    </Button>
                                </MuiThemeProvider>
                            </TableCell>

                        </TableRow>
                    )
                }
            </TableBody>
        </Table>
    </React.Fragment>
};

export default DataTableDisc;