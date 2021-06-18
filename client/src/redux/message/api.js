import { fetchMessageRoomSuccess } from './action'

import axios from 'axios';
import { tokenConfig } from "../auth/api";

import { notificationError, notificationSuccess } from "../notification/action";
import { SERVER_URL } from "../../App";

export const fetchMessagesRoom = (id) => (dispatch, getState) => {
    axios.get(SERVER_URL + "/message/room/" + id, tokenConfig(getState))
        .then(res => {
            dispatch(fetchMessageRoomSuccess(res.data))
            dispatch(notificationSuccess(res.data.message))
        }
        ).catch(err => {
            console.log(err)
            dispatch(notificationError(err.toString()))
        })
}