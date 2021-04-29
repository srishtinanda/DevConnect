import axios from "axios"
import { ADD_POST, POSTS_ERROR, ADD_COMMENT, REMOVE_COMMENT } from "../types"
import { setAlert } from "../index"

export const addPost = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  }
  try {
    const res = await axios.post("/api/posts", formData, config)

    dispatch({
      type: ADD_POST,
      payload: res.data,
    })
    dispatch(setAlert("Post Created", "success"))
  } catch (err) {
    dispatch({
      type: POSTS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

export const addComment = (postId, formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  }
  try {
    const res = await axios.post(
      `/api/posts/comment/${postId}`,
      formData,
      config
    )

    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    })
    dispatch(setAlert("Comment Added", "success"))
  } catch (err) {
    dispatch({
      type: POSTS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/comment/${postId}/${commentId}`)
    console.log("it will sigrbhth", postId, commentId)
    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId,
    })
    dispatch(setAlert("Comment Removed", "success"))
  } catch (err) {
    dispatch({
      type: POSTS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}
