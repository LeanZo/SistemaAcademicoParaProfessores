import {urls, privateUrls} from "./urlUtils";
import {AppBar, IconButton, Toolbar, Typography, withStyles} from "@material-ui/core";
import ExitToApp from '@material-ui/icons/ExitToApp';
import Home from "@material-ui/icons/Home";
import React, {Fragment} from "react";
import {Link, withRouter} from "react-router-dom";
import {compose} from "recompose";
import {connect} from "react-redux";
import {logout} from "./actions/actionCreator";
import PropTypes from 'prop-types';
import FirebaseService from './services/FirebaseService'

const styles = {
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
    },
};

export const TopBar = ({userAuth, logout, classes}) => {
    const email = localStorage.getItem('email');

    return (<AppBar position="static">
        <Toolbar>

            <IconButton color="inherit" aria-label="Menu" component={props => <Link to={privateUrls.home.path} {...props} />}>
                <Home />
            </IconButton>

            <Typography type="title" color="inherit">
                Sistema CAP
            </Typography>

            {
                email &&
                <Fragment>
                    <Typography type="title" color="inherit" style={{ marginLeft:'auto', marginRight:0 }}>
                        {email}
                    </Typography>

                    <IconButton color="inherit" aria-label="Menu" onClick={() => FirebaseService.logout()}>
                        <ExitToApp />
                    </IconButton>
                </Fragment>}

        </Toolbar>
    </AppBar>);
};

const mapStateToProps = state => {
    return {userAuth: state.userAuth}
};

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout()),
    }
};

 TopBar.propTypes = {
     classes: PropTypes.object.isRequired,
 };

export default compose(
    withRouter,
    connect(null, mapDispatchToProps)
)(TopBar);