import axios from "axios"
import { USER_LOADED, AUTH_ERROR } from "../types"
import { setAuthToken } from "../../utils"

const userLoaded = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }

  try {
    const res = await axios.get("/api/auth")
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    })
  }
}

export default userLoaded
