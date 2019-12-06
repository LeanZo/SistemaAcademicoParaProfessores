import React, {Component, Fragment} from "react";
import {Button, TextField, Typography} from "@material-ui/core";
import FirebaseService from "./services/FirebaseService";
import {urls, privateUrls} from "./urlUtils";
import {withRouter} from "react-router-dom";
import App from "./App";

class Login extends Component {

    state = {
        email: '',
        password: ''
    };

    login = (event) => {
        event.preventDefault();
        const {email} = this.state;
        const {password} = this.state;
        FirebaseService.login(email, password)
            .then(() => {
                localStorage.setItem('email', email);
                this.props.history.push(privateUrls.home.path);
            })
            .catch(error => {
                alert(error.message);
            });
    };

    createUser = (event) => {
        event.preventDefault();
        const {email} = this.state;
        const {password} = this.state;

        FirebaseService.createUser(email, password).then(
            (user) => {
                localStorage.setItem('email', email);
                this.props.history.push(privateUrls.home.path);
                console.log(user);
            }
        ).catch(
            (error) => {
                alert(error.message)
            }
        )
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render = () => {
        App.setCardSize(false);
        return (
            <Fragment>
                <Typography variant="headline" component="h2">Login</Typography>
                <form onSubmit={this.login}>
                    <TextField className="input-field"
                               type="email"
                               value={this.state.email}
                               label="Email"
                               required
                               onChange={this.handleChange('email')}/>
                    <TextField className="input-field"
                               type="password"
                               value={this.state.password}
                               label="Senha"
                               required
                               onChange={this.handleChange('password')}/>

                    <Button type="submit" variant="contained" color="primary"
                            style={{marginTop: '20px', display: 'inline-block'}}>
                        Login
                    </Button>

                    {/* <Button onClick={this.createUser} variant="outlined" color="primary"
                            style={{marginTop: '20px', display: 'inline-block', marginLeft: '10px'}}>
                        Novo Usuário
                    </Button> */}

                </form>
            </Fragment>)
    };
}


export default withRouter(Login);