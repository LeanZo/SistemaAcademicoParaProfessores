import React from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from './firebase';
import FirebaseService from './services/FirebaseService';
import {TopBar} from './TopBar';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {urls, privateUrls} from "./urlUtils";
import {Welcome} from './Welcome';
import {login, logout} from "./actions/actionCreator";
import NavigationLoggedWrapper from './NavigationLoggedWrapper';
import NavigationWrapper from './NavigationWrapper';
import {MuiThemeProvider} from "@material-ui/core/styles/index";
import {AppBar, Toolbar, Typography, Card, CardContent} from "@material-ui/core";
import {createMuiTheme} from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
import Login from './Login';
import {withRouter} from "react-router-dom";
import {compose} from "recompose";
import {connect} from "react-redux";
import AddProf from './Professores/AddProf';
import DataTableProf from "./Professores/DataTableProf";
import AddAluno from './Alunos/AddAluno';
import DataTableAluno from "./Alunos/DataTableAluno";
import AddDisc from './Disciplinas/AddDisc';
import DataTableDisc from "./Disciplinas/DataTableDisc";
import Footer from './Footer';

const theme = createMuiTheme({
  palette: {
      primary: blue,
      secondary: red
  },
});

let cardStyle = {
    margin: '50px'
}

class App extends React.Component {
  state = {
    data: [],
    dbprof: [],
    dbaluno: [],
    dbdisc: [],
    footerHeight: 0
  };

  componentDidMount() {
    FirebaseService.onAuthChange(
      (authUser) => this.props.login(authUser),
      () => this.props.logout()
    );
    FirebaseService.getDataList('professor', (dataReceived) => this.setState({dbprof: dataReceived}));
    FirebaseService.getDataList('aluno', (dataReceived) => this.setState({dbaluno: dataReceived}, () => console.log("aaa"+this.state.dbaluno)));
    FirebaseService.getDataList('turma', (dataReceived) => this.setState({dbdisc: dataReceived}));
  }
    
    static setCardSize = (setToDefault = true) => {
        var card = document.getElementById('maincard');

        if(card){
            if (setToDefault){
                card.style.margin = '50px';
            } else {
                card.style.marginLeft = '25%';
                card.style.marginRight = '25%';
            }
        }
    }

    setContentPadding = (height) => {
        this.setState({footerHeight: height});
    }

  render() {
      return (
          <MuiThemeProvider theme={theme}>
              <React.Fragment>
                  <div style={{position: 'relative', minHeight: '100vh'}}>
                      <div style={{paddingBottom: this.state.footerHeight}}>
                  <TopBar/>
                  <Card id='maincard' style={{margin: '50px'}}>
                    <CardContent>
                        <Route exact
                              path={privateUrls.login.path}
                              render={(props) => <NavigationLoggedWrapper component={Login} {...props}/>}
                        />

                        <Route exact
                            path={privateUrls.home.path}
                            render={(props) => <NavigationWrapper component={Welcome} {...props}/>}
                        />

                        <Route exact
                            path={urls.dataProf.path}
                            render={(props) => <NavigationWrapper component={DataTableProf} {...props} 
                            data={this.state.dbprof}/>}
                        />

                        <Route exact
                            path={privateUrls.addProf.path}
                            render={(props) => <NavigationWrapper component={AddProf} {...props}/>}
                        />

                        <Route exact
                            path={privateUrls.editProf.path}
                            render={(props) => <NavigationWrapper component={AddProf} {...props}/>}
                        />

                        <Route exact
                            path={urls.dataAluno.path}
                            render={(props) => <NavigationWrapper component={DataTableAluno} {...props} 
                            data={this.state.dbaluno}/>}
                        />

                        <Route exact
                            path={privateUrls.addAluno.path}
                            render={(props) => <NavigationWrapper component={AddAluno} {...props}/>}
                        />

                        <Route exact
                            path={privateUrls.editAluno.path}
                            render={(props) => <NavigationWrapper component={AddAluno} {...props}/>}
                        />

                        <Route exact
                            path={urls.dataDisc.path}
                            render={(props) => <NavigationWrapper component={DataTableDisc} {...props} 
                            data={this.state.dbdisc}/>}
                        />

                        <Route exact
                            path={privateUrls.addDisc.path}
                            render={(props) => <NavigationWrapper component={AddDisc} {...props}/>}
                        />

                        <Route exact
                            path={privateUrls.editDisc.path}
                            render={(props) => <NavigationWrapper component={AddDisc} {...props}/>}
                        />

                    </CardContent>
                  </Card>
                  </div>
                  <Footer callback={this.setContentPadding.bind(this)}/>
                  </div>
              </React.Fragment>
          </MuiThemeProvider>
      );
  }
}

const mapDispatchToProps = dispatch => {
  return {
      login: authUser => dispatch(login(authUser)),
      logout: () => dispatch(logout()),
  }
};

export default compose(
  withRouter,
  connect(null, mapDispatchToProps)
)(App);
