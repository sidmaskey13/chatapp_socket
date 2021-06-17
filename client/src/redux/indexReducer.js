import { combineReducers } from 'redux';
import NotificationReducer from './notification/reducer'
import AuthcationReducer from './auth/reducer'
import UsersReducer from './users/reducer'
import RoomReducer from './room/reducer'

const indexReducer = combineReducers({
    notifications: NotificationReducer,
    auth: AuthcationReducer,
    users: UsersReducer,
    rooms: RoomReducer
});

export default indexReducer;