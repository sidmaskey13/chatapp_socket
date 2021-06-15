import { SUCCESS_NOTIFY, ERROR_NOTIFY, CLEAR_MESSAGE } from "./types"

export const notificationSuccess = (response) => {
    return {
        type: SUCCESS_NOTIFY,
        message: response
    }
}

export const notificationError = (response) => {
    return {
        type: ERROR_NOTIFY,
        payload: response
    }
}

export const clearErrorMessage = () => {
    return {
        type: CLEAR_MESSAGE,
    }
}


