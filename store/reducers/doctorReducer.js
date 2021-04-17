const initialState = {
    medicine: []
}

export default function medicineReducer (state = initialState, action) {
    const {type, payload} = action
    if (type === 'doctor/fetch') {
        return {...state, doctor: payload}
    }
    return state
}