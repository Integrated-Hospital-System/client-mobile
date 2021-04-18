const initialState = {
    medicines: []
}

export default function doctorReducer (state = initialState, action) {
    const {type, payload} = action
    if (type === 'medicine/fetch') {
        return {...state, medicines: payload}
    } else if (type === 'alarm/update') {
        return {...state, medicines: payload}
    }
    return state
}