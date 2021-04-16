const axios = require('axios')

export function asyncFetchDoctor () {
    return async (dispatch) => {
        try {
            const {data} = await axios({
                url: 'http://localhost:3001/accounts',
                method: 'get'
            })
            const filtered = data.filter(account => account.role === 'doctor')
            console.log(filtered, '<<< filtered account');
            dispatch({type: 'doctor/fetch', payload: filtered})
        } catch (error) {
            console.log(error)
        }
    }
}