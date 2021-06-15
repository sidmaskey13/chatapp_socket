import { SUCCESS_NOTIFY, ERROR_NOTIFY, CLEAR_MESSAGE } from "./types"

const INITIAL_STATE = { message: '', type: '' }

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case SUCCESS_NOTIFY:
            return {
                type: 'success',
                message: action.message
            }

        case ERROR_NOTIFY:
            return {
                type: 'error',
                message: action.payload
            }

        case CLEAR_MESSAGE:
            return {
                INITIAL_STATE,
                type: 'clear'
            }

        default:
            return state;
    }
}