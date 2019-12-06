import {Button, TextField, Typography, Box} from "@material-ui/core";
import React, {Component} from "react";
import FirebaseService from "../services/FirebaseService";
import {urls, privateUrls} from "../urlUtils";
import {Link} from 'react-router-dom';
import {withRouter} from "react-router-dom";
import App from "../App";
import EditPassword from './EditPassword';

class AddProf extends Component {
    state = {id: null, key: '', nome: '', formacao: '', senha: '', titulo: 'Cadastrar professor', botao: 'Cadastrar', isAdd: true};

    componentWillMount = () => {
        const {id} = this.props.match.params;

        if (!(id === undefined || !id)) {
            this.setState({id});
            FirebaseService.getUniqueDataBy('professor', id, (data) => this.setState({...data}, () => console.log(this.state)));
            this.setState({titulo: 'Editar professor', botao: 'Editar', isAdd: false});
        }

    };

    submit = (event) => {
        if(event !== undefined)
        event.preventDefault();

        const {id} = this.state;
        const {nome} = this.state;
        const {senha} = this.state;

        let objToSubmit = {
            nome,
            senha
        };

        if (this.props.match.params.id === undefined) {
            FirebaseService.pushData('professor', id, objToSubmit);
        } else {
            FirebaseService.updateData(this.props.match.params.id, 'professor', objToSubmit)
        }

        this.props.history.push(urls.dataProf.path);

    };

    changePassword = (oldPass, newPass) => {
        if(oldPass == this.state.senha){
            console.log(oldPass + " " + newPass);
            this.setState({senha: newPass}, () => {this.submit()});
            alert("Senha alterada com sucesso.");
        } else {
            alert("Senha atual incorreta."); 
        }
    }

    handleChange = name => event => {
        console.log("aaa");
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
                       label="Login"
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

             
                {
                this.state.isAdd ?
                    <TextField className="input-field"
                    type="password"
                    label="Senha"
                    value={this.state.senha}
                    required
                    onChange={this.handleChange('senha')}/>
                :
                    <EditPassword callback={this.changePassword.bind(this)} {...this.props}/>
                }   
            
            

            <Button type="submit" variant="contained" color="primary"
                    style={{marginTop: '30px', display: 'inline-block'}}>
                {this.state.botao}
            </Button>
            <Button variant="outlined" color="secondary" style={{marginTop: '30px', display: 'inline-block', marginLeft: '10px'}}
                    component={props => <Link to={urls.dataProf.path} {...props} {...this.state.senha}/>}>
                Cancelar
            </Button>
        </form>
    </React.Fragment>)
    }
}

export default withRouter(AddProf);