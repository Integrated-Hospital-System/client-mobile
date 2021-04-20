const initialState = {
    medicines: []
}

export default function doctorReducer (state = initialState, action) {
    const {type, payload} = action
    if (type === 'medicine/fetch') {
        return {...state, medicines: payload}
    } else if (type === 'alarm/update') {
        return {...state, medicines: payload}
    } else if (type === 'medicine/delete') {
        console.log('masuk sini')
        return {...state, medicines: state.medicines.filter(med => med.medicine.name !== payload)}
    }
    return state
}