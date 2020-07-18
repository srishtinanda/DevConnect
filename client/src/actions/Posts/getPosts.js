import axios from 'axios'
import {
    GET_POSTS,
    POSTS_ERROR,
    UPDATE_LIKES,
    DELETE_POST,
    GET_POST
} from '../types'
import { setAlert } from '../index'

export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get('/api/posts')

        dispatch({
            type: GET_POSTS,
            payload: res.data
        })   
    } catch(err) {
        dispatch({
            type: POSTS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

export const addLikes = (id) => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/like/${id}`)

        dispatch({
            type: UPDATE_LIKES,
            payload: {id, likes: res.data}
        })   
    } catch(err) {
        dispatch({
            type: POSTS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

export const removeLike = (id) => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/unlike/${id}`)

        dispatch({
            type: UPDATE_LIKES,
            payload: {id, likes: res.data}
        })   
    } catch(err) {
        dispatch({
            type: POSTS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

export const deletePost = (id) => async dispatch => {
    try {
        await axios.delete(`/api/posts/${id}`)

        dispatch({
            type: DELETE_POST,
            payload: id
        })   
        dispatch(setAlert('Post Deleted', 'success'))

    } catch(err) {
        dispatch({
            type: POSTS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

export const getPost = (id) => async dispatch => {
    try {
        const res = await axios.get(`/api/posts/${id}`)

        dispatch({
            type: GET_POST,
            payload: res.data
        })   
    } catch(err) {
        dispatch({
            type: POSTS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}