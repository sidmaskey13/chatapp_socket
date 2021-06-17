import { FETCH_ALL_ROOMS_SUCCESS } from './types'

export const fetchAllRoomsSuccess = (response) => {
    return {
        type: FETCH_ALL_ROOMS_SUCCESS,
        payload: response
    }
}