import {combineReducers} from 'redux'
import userReducer from './userStore'
import alertReducer from './alertStore'
import resumeReducer from './resumeStore'

const rootReducer = combineReducers({userReducer, alertReducer, resumeReducer})

export default rootReducer