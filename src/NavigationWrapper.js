import {connect} from "react-redux";
import {Redirect, withRouter} from "react-router-dom";
import {compose} from "recompose";
import React from "react";
import {urls, privateUrls} from "./urlUtils";

const ifNotLoggedGoToLogin = (userAuth, Component, props) => {
    return userAuth != null
        ? <Component {...props}/>
        : <Redirect to={privateUrls.login.path}/>
};

const NavigationWrapper = ({userAuth, component, ...otherProps}) => {
    return ifNotLoggedGoToLogin(userAuth, component, otherProps);
};

const mapStateToProps = state => {
    return {userAuth: state.userAuth}
};

export default compose(withRouter, connect(mapStateToProps))(NavigationWrapper);