import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from "react-redux";

export const PrivateRoute = ({ component: Component, auth, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => {
                if (auth.isAuthenticated) {
                    return <Component {...props} />;
                } else {
                    return (<Redirect
                        to={{
                            pathname: "/login",
                        }}
                    />)
                }
            }}
        />
    )
};
const mapStatetoProps = state => ({
    auth: state.auth
});
export default connect(mapStatetoProps, null)(PrivateRoute);