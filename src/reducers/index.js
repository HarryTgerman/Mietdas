import { combineReducers } from 'redux';
import listReducer from './listReducer'
import navbarReducer from './navbarReducer'
import authReducer from './authReducer'

export default combineReducers({
  listState: listReducer,
  navState: navbarReducer,
  authState: authReducer
})
