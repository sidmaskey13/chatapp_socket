import {
    LOGIN_SUCCESS, LOGIN_FAIL, REGISTER_SUCCESS, REGISTER_FAIL, LOGOUT_SUCCESS, USER_LOADED
} from './types'

export const loadUser = (response) => {
    return {
        type: USER_LOADED,
        payload: response
    }
}

export const loginSuccess = (response) => {
    return {
        type: LOGIN_SUCCESS,
        payload: response
    }
}


export const loginFail = () => {
    return {
        type: LOGIN_FAIL,
    }
}

export const registerSuccess = (response) => {
    return {
        type: REGISTER_SUCCESS,
        payload: response
    }
}

export const registerFail = () => {
    return {
        type: REGISTER_FAIL
    }
}

export const logOutSuccess = () => {
    return {
        type: LOGOUT_SUCCESS,
    }
}