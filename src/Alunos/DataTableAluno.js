import React from 'react';
import {Button, Table, TableBody, TableCell, TableHead, TableRow, Typography, Box} from "@material-ui/core";
import FirebaseService from '../services/FirebaseService';
import {Link} from 'react-router-dom';
import {urls, privateUrls} from "../urlUtils";
import red from '@material-ui/core/colors/red';
import {MuiThemeProvider} from "@material-ui/core/styles/index";
import {createMuiTheme} from '@material-ui/core/styles';
import App from "../App";

const theme = createMuiTheme({
    palette: {
        primary: red,
    },
  });

export const DataTableAluno = ({data}) => {
    const remove = (id) => {
        FirebaseService.remove(id, 'aluno');
    };
    App.setCardSize();
    return <React.Fragment>
        <Typography variant="headline" component="h2">Alunos</Typography>
        <Box style={{marginTop: '5px'}}>
            <Button color="primary" variant="outlined" component={props => <Link to={privateUrls.home.path} {...props}/>}>
                Voltar
            </Button>
            <Button style={{ float: "right" }} color="primary" variant="contained" component={props => <Link to={privateUrls.addAluno.path} {...props}/>}>
                Adicionar novo aluno
            </Button>
        </Box>
        <Table selectable={false}>
            <TableHead>
                <TableRow>
                    <TableCell>Matricula</TableCell>
                    <TableCell align="left">Nome</TableCell>
                    <TableCell>Ações</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    data.map((item, index) =>
                        <TableRow key={index}>
                            <TableCell>{item.key}</TableCell>
                            <TableCell align="left">{item.nome}</TableCell>
                            <TableCell>
                                <Button component={props => <Link to={privateUrls.editAluno.pathWithouParam + item.key} {...props}/>}>
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

export default DataTableAluno;