import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { database } from 'firebase';

export default class EditPassword extends Component {
  state = {senhaAntiga: '', senhaAtual: '', open: ''};

  handleClickOpen = () => {
    this.setState({open: true});
  };

  handleCloseOk = () => {
    this.props.callback(this.state.senhaAntiga, this.state.senhaNova);
    this.setState({open: false});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleChange = name => event => {
    this.setState({
        [name]: event.target.value,
    });
  };

    render = () => {

        return (
            <React.Fragment>
            <div>
                <Button variant="contained" color="secondary" onClick={this.handleClickOpen} style={{marginTop: '15px'}}>
                    Alterar senha
                </Button>
            </div>
        <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Alterar senha</DialogTitle>
            <DialogContent>
            <DialogContentText>
                Digite a senha atual e a nova senha desejada.
            </DialogContentText>
            <TextField
                autoFocus
                required
                margin="dense"
                id="senhaAtual"
                label="Senha atual"
                type="password"
                onChange={this.handleChange('senhaAntiga')}
                fullWidth
                />
            <TextField
                autoFocus
                required
                margin="dense"
                id="senhaNova"
                label="Senha nova"
                type="password"
                onChange={this.handleChange('senhaNova')}
                fullWidth
                />
            </DialogContent>
            <DialogActions>
            <Button onClick={this.handleClose} color="primary">
                Cancelar
            </Button>
            <Button onClick={this.handleCloseOk} color="primary">
                Aceitar
            </Button>
            </DialogActions>
        </Dialog>
        </React.Fragment>
        )
    }
}