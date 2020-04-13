import { LOGOUT, CLEAR_PROFILE } from '../types'

const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    })
    dispatch({
        type: CLEAR_PROFILE
    })
}

export default logout