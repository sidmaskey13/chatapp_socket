import { FETCH_ALL_ROOMS_SUCCESS } from './types'


let INITIAL_STATE = {
    roomList: []
}

export default function (state = INITIAL_STATE, action) {

    switch (action.type) {
        case FETCH_ALL_ROOMS_SUCCESS:
            return {
                ...state,
                roomList: action.payload.data
            }
        default:
            return state;
    }
}