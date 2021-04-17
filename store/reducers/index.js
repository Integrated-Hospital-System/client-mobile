import {combineReducers} from 'redux'
import doctorReducer from './doctorReducer'
import medicineReducer from './medicineReducer'

export default combineReducers({
    doctorReducer,
    medicineReducer
})