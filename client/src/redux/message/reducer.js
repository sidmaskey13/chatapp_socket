import { FETCH_MESSAGE_ROOM_SUCCESS } from './types'


let INITIAL_STATE = {
    messages: []
}

export default function (state = INITIAL_STATE, action) {

    switch (action.type) {
        case FETCH_MESSAGE_ROOM_SUCCESS:
            return {
                ...state,
                messages: action.payload.data
            }
        default:
            return state;
    }
}