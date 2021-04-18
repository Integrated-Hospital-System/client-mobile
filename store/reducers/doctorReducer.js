const initialState = {
    doctors: []
}

export default function medicineReducer (state = initialState, action) {
    const {type, payload} = action
    if (type === 'doctor/fetch') {
        return {...state, doctors: payload}
    }
    return state
}