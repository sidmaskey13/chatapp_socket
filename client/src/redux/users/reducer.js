import { LOAD_USERS_FAIL, LOAD_USERS_SUCCESS, DELETE_USER_SUCCESS, CHANGE_USER_ROLE_SUCCESS, CHANGE_USER_ROLE_FAIL, DELETE_USER_FAIL } from "./types"

let INITIAL_STATE = {
    usersList: [],
    postCountList: [],
    totalData: 0,
}

export default function (state = INITIAL_STATE, action) {

    switch (action.type) {
        case LOAD_USERS_SUCCESS:
            return {
                ...state,
                usersList: action.payload.data,
                totalData: action.payload.totalData,
            }
        case DELETE_USER_SUCCESS:
            return {
                ...state,
                usersList: state.usersList.filter(i => i._id !== action.payload)
            }
        default:
            return state;
    }
}