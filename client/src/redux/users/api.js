import { fetchAllUsers, deleteUserSuccess, fetchUsersError, deleteUserError } from './action'

import axios from 'axios';
import { tokenConfig } from "../auth/api";

import { notificationError, notificationSuccess } from "../notification/action";
import { SERVER_URL } from "../../App";

export const fetchUsers = (page) => (dispatch, getState) => {
    axios.get(SERVER_URL + "/auth/users?page=" + page, tokenConfig(getState))
        .then(res => {
            dispatch(fetchAllUsers(res.data))
            dispatch(notificationSuccess(res.data.message))
        }
        ).catch(err => {
            console.log(err)
            dispatch(fetchUsersError(err.toString()));
            dispatch(notificationError(err.toString()))
        })
}

export const deleteUser = (id) => (dispatch, getState) => {
    axios.delete(SERVER_URL + "/auth/delete" + '/' + id, tokenConfig(getState))
        .then(res => {
            dispatch(deleteUserSuccess(id))
            dispatch(notificationSuccess(res.data.message))
        }
        ).catch(err => {
            dispatch(deleteUserError(err.toString()));
            dispatch(notificationError(err.toString()))
        })
};


