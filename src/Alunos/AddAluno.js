import {Button, TextField, Typography} from "@material-ui/core";
import React, {Component} from "react";
import FirebaseService from "../services/FirebaseService";
import {urls, privateUrls} from "../urlUtils";
import {Link} from 'react-router-dom';
import {withRouter} from "react-router-dom";
import App from "../App";

class AddAluno extends Component {
    state = {id: null, key: '', nome: '', titulo: 'Cadastrar aluno', botao: 'Cadastrar', isAdd: true};

    componentWillMount = () => {
        const {id} = this.props.match.params;

        if (!(id === undefined || !id)) {
            this.setState({id});
            FirebaseService.getUniqueDataBy('aluno', id, (data) => this.setState({...data}, () => console.log(this.state)));
            this.setState({titulo: 'Editar aluno', botao: 'Editar', isAdd: false});
        }

    };

    submit = (event) => {
        event.preventDefault();

        const {id} = this.state;
        const {nome} = this.state;

        let objToSubmit = {
            nome
        };

        if (this.props.match.params.id === undefined) {
            FirebaseService.pushData('aluno', id, objToSubmit);
        } else {
            FirebaseService.updateData(this.props.match.params.id, 'aluno', objToSubmit)
        }

        this.props.history.push(urls.dataAluno.path);

    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render = () => {
        App.setCardSize(false);
        return (<React.Fragment>

        <Typography variant="headline" component="h2">{this.state.titulo}</Typography>
        <form onSubmit={this.submit}>

            <TextField className="input-field"
                       type="text"
                       label="Matricula"
                       value={this.state.id}
                       InputProps={{
                        readOnly: !this.state.isAdd,
                       }}
                       required
                       onChange={this.handleChange('id')}/>

            <TextField className="input-field"
                       type="text"
                       label="Nome"
                       value={this.state.nome}
                       required
                       onChange={this.handleChange('nome')}/>

            <Button type="submit" variant="contained" color="primary"
                    style={{marginTop: '20px', display: 'inline-block'}}>
                {this.state.botao}
            </Button>
            <Button variant="outlined" color="secondary" style={{marginTop: '20px', display: 'inline-block', marginLeft: '10px'}}
                    component={props => <Link to={urls.dataAluno.path} {...props}/>}>
                Cancelar
            </Button>
        </form>
    </React.Fragment>)
    }
}

export default withRouter(AddAluno);