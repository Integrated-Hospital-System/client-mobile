import {combineReducers} from 'redux'
import doctorReducer from './doctorReducer'
import medicineReducer from './medicineReducer'
import patientReducer from './patientReducer'

export default combineReducers({
    doctorReducer,
    medicineReducer,
    patientReducer
})