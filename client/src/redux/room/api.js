import { fetchAllRoomsSuccess } from './action'

import axios from 'axios';
import { tokenConfig } from "../auth/api";

import { notificationError, notificationSuccess } from "../notification/action";
import { SERVER_URL } from "../../App";

export const fetchAllRooms = () => (dispatch, getState) => {
    axios.get(SERVER_URL + "/room/all", tokenConfig(getState))
        .then(res => {
            dispatch(fetchAllRoomsSuccess(res.data))
            dispatch(notificationSuccess(res.data.message))
        }
        ).catch(err => {
            console.log(err)
            dispatch(notificationError(err.toString()))
        })
}