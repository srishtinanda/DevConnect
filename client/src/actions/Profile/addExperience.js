import axios from "axios"
import { UPDATE_PROFILE, PROFILE_ERROR } from "../types"
import { setAlert } from "../index"

const addExperience = (formData, history) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  }
  try {
    const res = await axios.put("/api/profile/experience", formData, config)

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    })
    dispatch(setAlert("Experience added", "success"))
    history.push("/dashboard")
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

export default addExperience
