import { LOAD_USERS_FAIL, LOAD_USERS_SUCCESS, DELETE_USER_SUCCESS, CHANGE_USER_ROLE_SUCCESS, CHANGE_USER_ROLE_FAIL, DELETE_USER_FAIL } from "./types"

export const fetchAllUsers = (response) => {
    return {
        type: LOAD_USERS_SUCCESS,
        payload: response
    }
}

export const fetchUsersError = (error) => {
    return {
        type: LOAD_USERS_FAIL,
        message: error
    }
}


export const deleteUserSuccess = id => {
    return {
        type: DELETE_USER_SUCCESS,
        payload: id
    }
}

export const deleteUserError = (error) => {
    return {
        type: DELETE_USER_FAIL,
        message: error
    }
}

