import { FETCH_ALL_ROOMS_SUCCESS, SET_SELECT_ROOM, GET_SELECT_ROOM } from './types'


let INITIAL_STATE = {
    roomList: [],
    selected_room: localStorage.getItem('room_details')
}

export default function (state = INITIAL_STATE, action) {

    switch (action.type) {
        case FETCH_ALL_ROOMS_SUCCESS:
            return {
                ...state,
                roomList: action.payload.data
            }
        case SET_SELECT_ROOM:
            localStorage.setItem('room_details', action.payload);
            return {
                ...state,
                selected_room: action.payload
            }
        case GET_SELECT_ROOM:
            return {
                ...state,
                selected_room: localStorage.getItem('room_details')
            }
        default:
            return state;
    }
}