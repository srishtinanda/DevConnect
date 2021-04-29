import axios from "axios"
import { LOGIN_SUCCESS, LOGIN_FAIL } from "../types"
import { setAlert } from "../index"
import { userLoaded } from "../../actions"

const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  }

  const body = JSON.stringify({ email, password })
  try {
    const res = await axios.post("/api/auth", body, config)

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    })
    dispatch(userLoaded())
  } catch (err) {
    const errors = err.response?.data.errors
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg)))
    }
    dispatch({
      type: LOGIN_FAIL,
    })
  }
}

export default login
