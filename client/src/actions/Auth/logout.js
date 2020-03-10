import { LOGOUT } from '../types'

const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    })
}

export default logout