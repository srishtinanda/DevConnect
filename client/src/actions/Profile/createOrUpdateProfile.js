import axios from "axios"
import { GET_PROFILE, PROFILE_ERROR } from "../types"
import { setAlert } from "../index"

const createProfile = (formData, history, edit = false) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  }
  try {
    const res = await axios.post("/api/profile", formData, config)

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    })
    dispatch(setAlert(edit ? "Profile Updated" : "Profile Created"))

    if (!edit) {
      history.push("/dashboard")
    }
  } catch (err) {
    const errors = err.response?.data.errors
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg)))
    }
    dispatch({
      type: PROFILE_ERROR,
    })
  }
}

export default createProfile
