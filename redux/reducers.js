import { combineReducers } from "redux"
import {
  forgotPasswordReducer,
  profileReducer,
  registerReducer,
  regSocialReducer,
  resetPasswordReducer,
  updateProfileReducer,
} from "./reducers/userReducers"

const reducer = combineReducers({
  register: registerReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  resetPassword: resetPasswordReducer,
  regSocial: regSocialReducer,
  updateProfile: updateProfileReducer,
})

export default reducer
