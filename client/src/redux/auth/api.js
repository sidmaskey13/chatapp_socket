import axios from 'axios'
import {
    loginSuccess, loginFail, logOutSuccess, registerSuccess, registerFail, loadUser
} from './action'
import { notificationError, notificationSuccess, clearErrorMessage } from "../notification/action";

import { SERVER_URL } from "../../App";

const config = {
    headers: {
        'Content-Type': 'application/json'
    }
};

export const loadLoggedInUser = () => (dispatch, getState) => {
    axios.get(SERVER_URL + "/auth/load-user", tokenConfig(getState))
        .then(res => {
            dispatch(loadUser(res.data))
        }
        ).catch(err => {
            console.log(err)
            dispatch(notificationError(err.toString()))

        })
}

export const login = (data) => (dispatch) => {
    const body = JSON.stringify(data);
    axios.post(SERVER_URL + '/auth/login', body, config).then(
        res => {
            dispatch(loginSuccess(res.data));
            dispatch(notificationSuccess('Login Successful'))
        }
    ).catch(err => {
        dispatch(loginFail())
        dispatch(notificationError(err.response.data.message))
    }
    )
};

export const register = (data) => (dispatch) => {
    const body = JSON.stringify(data);
    axios.post(SERVER_URL + '/auth/register', body, config).then(
        res => {
            dispatch(registerSuccess(res.data));
            dispatch(notificationSuccess('Register Successful'))
        }
    ).catch(err => {
        dispatch(registerFail())
        dispatch(notificationError(err.response.data.message))
    }
    )
};

export const logOut = () => (dispatch, getState) => {
    dispatch(logOutSuccess());
    dispatch(notificationSuccess('Logout Successful'))
};


//setup config with token
export const tokenConfig = getState => {
    const token = getState().auth.token;
    //config headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    //If token then add to header
    if (token) {
        config.headers['Authorization'] = `Token ${token}`;
    }
    return config
}
