import { FETCH_ALL_ROOMS_SUCCESS, SET_SELECT_ROOM, GET_SELECT_ROOM } from './types'

export const fetchAllRoomsSuccess = (response) => {
    return {
        type: FETCH_ALL_ROOMS_SUCCESS,
        payload: response
    }
}

export const setRoomDetails = (data) => {
    return {
        type: SET_SELECT_ROOM,
        payload: data
    }
}

export const getRoomDetails = () => {
    return {
        type: GET_SELECT_ROOM,
    }
}