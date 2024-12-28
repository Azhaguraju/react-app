import { combineReducers } from 'redux'
import onboardEmployeeReducer from './onboardEmployeeReducer'

const appReducer = combineReducers({
  employeedata: onboardEmployeeReducer,
})

const RootReducer = (state: any, action: any) => {

  //to clera the state data
  if (action.type === 'LOGOUT') {
    state = {}
  }

  return appReducer(state, action)
}

export default RootReducer
