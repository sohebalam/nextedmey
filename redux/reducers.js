import { combineReducers } from "redux"
import { profileReducer, registerReducer } from "./reducers/userReducers"

const reducer = combineReducers({
  register: registerReducer,
  profile: profileReducer,
})

export default reducer
