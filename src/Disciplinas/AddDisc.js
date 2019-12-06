import {Button, TextField, Typography, InputLabel, Select, MenuItem, FormControl, Box} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import React, {Component} from "react";
import FirebaseService from "../services/FirebaseService";
import {urls, privateUrls} from "../urlUtils";
import {Link} from 'react-router-dom';
import {withRouter} from "react-router-dom";
import App from "../App";

class AddDisc extends Component {
    //state = {id: null, nome: '', mat_professor: '', professor: {id: ''}, dbprof:[], titulo: 'Cadastrar disciplina', botao: 'Cadastrar'};
    
    constructor(props) {
        super(props);
        this.state = {id: null, nome: '', mat_professor: '', professorkey: '', alunos: {}, dbprof:[], titulo: 'Cadastrar turma', botao: 'Cadastrar'};
        
      }

    componentWillMount = () => {
        const {id} = this.props.match.params;

        if (!(id === undefined || !id)) {
            this.setState({id});
            FirebaseService.getUniqueDataBy('turma', id, (data) => this.setState({...data}, () => console.log(this.state)));
            this.setState({titulo: 'Editar turma', botao: 'Editar'});
        }

        FirebaseService.getDataList('professor', (dataReceived) => this.setState({dbprof: dataReceived}));
    };

    submit = (event) => {
        event.preventDefault();

        const {id} = this.state;
        const {mat_professor} = this.state;
        const {professorkey} = this.state;
        const {alunos} = this.state

        let objToSubmit = {
            mat_professor,
            professorkey,
            alunos
        };

        if (this.props.match.params.id === undefined) {
            FirebaseService.pushData('turma', id, objToSubmit);
        } else {
            FirebaseService.updateData(this.props.match.params.id, 'turma', objToSubmit)
        }

        this.props.history.push(urls.dataDisc.path);

    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleProfChange = (name) => event => {
        const getProf = () => {
            let prof = '';
            this.state.dbprof.map((item, index) => { 
                if(item.key == event.target.value) 
                prof = item;
            });
            return prof;
        }
        let prof = getProf();
        this.setState({
            [name]: prof.key,
            mat_professor: prof.nome,
        });
    };

    componentDidMount() {
        this.setState({professorkey: this.state.professorkey});
    }

    render = () => {
        App.setCardSize(false);
        return (<React.Fragment>
        <Typography variant="headline" component="h2">{this.state.titulo}</Typography>
        <form onSubmit={this.submit}>

            <TextField className="input-field"
                       type="text"
                       label="Nome"
                       value={this.state.id}
                       required
                       onChange={this.handleChange('id')}/>

            <FormControl fullWidth='true' margin='normal'>
                <InputLabel id="professor-label">Professor</InputLabel>
                <Select
                    labelId="professor-label"
                    id="professor-select"
                    required
                    value={this.state.professorkey}
                    onChange={this.handleProfChange('professorkey')}>
                <MenuItem value="">
                    <em>Nenhum</em>
                </MenuItem>
                    {
                        this.state.dbprof.map((item, index) =>
                            <MenuItem key={item.key} value={item.key}>{item.nome}</MenuItem>
                        )
                    }
                </Select>
            </FormControl>

            <Button type="submit" variant="contained" color="primary"
                    style={{marginTop: '20px', display: 'inline-block', }}>
                {this.state.botao}
            </Button>
            <Button variant="outlined" color="secondary" style={{marginTop: '20px', display: 'inline-block', marginLeft: '10px'}}
                    component={props => <Link to={urls.dataDisc.path} {...props}/>}>
                Cancelar
            </Button>
        </form>
    </React.Fragment>)
    }
}

export default withRouter(AddDisc);