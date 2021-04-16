const initialState = {
    doctor: []
}

export default function doctorReducer (state = initialState, action) {
    const {type, payload} = action
    if (type === 'doctor/fetch') {
        return {...state, doctor: payload}
    }
    return state
}