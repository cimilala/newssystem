import {combineReducers, createStore} from "redux"
import {userReducer} from "./reducers/getUser"
import {composeWithDevTools} from "redux-devtools-extension"
const allReducer = combineReducers({
    user:userReducer
})
export default createStore(allReducer,composeWithDevTools())