import { FETCH_MESSAGE_ROOM_SUCCESS } from './types'

export const fetchMessageRoomSuccess = (response) => {
    return {
        type: FETCH_MESSAGE_ROOM_SUCCESS,
        payload: response
    }
}