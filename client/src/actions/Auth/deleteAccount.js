import axios from "axios"
import { ACCOUNT_DELETED, CLEAR_PROFILE, PROFILE_ERROR } from "../types"
import { setAlert } from "../index"

const deleteAccount = () => async (dispatch) => {
  if (window.confirm("Are you sure? This can NOT be undone")) {
    try {
      await axios.delete(`/api/profile`)
      dispatch({ type: CLEAR_PROFILE })
      dispatch({ type: ACCOUNT_DELETED })
      dispatch(setAlert("Your account has been permanantly deleted"))
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      })
    }
  }
}

export default deleteAccount
