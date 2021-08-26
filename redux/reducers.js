import { combineReducers } from "redux"
import { registerReducer } from "./reducers/userReducers"

const reducer = combineReducers({ register: registerReducer })

export default reducer
