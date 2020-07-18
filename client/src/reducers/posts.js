import { 
    GET_POSTS,
    POSTS_ERROR,
    UPDATE_LIKES,
    DELETE_POST,
    ADD_POST,
    GET_POST,
    REMOVE_COMMENT,
    ADD_COMMENT
} from '../actions/types'

const initialState = {
   post: null,
   posts: [],
   loading: true,
   error: {}
}

export default function(state=initialState, action) {
    const { type, payload } = action

    switch(type) {
        case GET_POSTS:
            return {
                ...state,
                loading: false,
                posts: payload
            }
        case ADD_POST:
            return {
                ...state,
                loading: false,
                posts: [payload, ...state.posts]
            }
        case ADD_COMMENT:
            return {
                ...state,
                loading: false,
                post: { ...state.post, Comment: payload }
            }
        case REMOVE_COMMENT:
            console.log(state.post.Comment, payload, 'dfgbtyjytrgerggrhtwheythrtghrtwheh', state)
            return {
                ...state,
                loading: false,
                post: state.post.Comment.filter((comment) =>(
                    comment._id !== payload
                ))
            }
        case GET_POST:
            return {
                ...state,
                loading: false,
                post: payload
            }
        case GET_POST:
            return {
                ...state,
                loading: false,
                post: payload
            }
        case GET_POST:
            return {
                ...state,
                loading: false,
                post: payload
            }
        case UPDATE_LIKES:
            return {
                ...state,
                loading: false,
                posts: state.posts.map((post) =>(
                    payload.id === post._id
                    ? {...post, likes: payload.likes}
                    : post
                ))
            }
        case DELETE_POST:
            return {
                ...state,
                loading: false,
                posts: state.posts.filter((post) =>(
                    post._id !== payload
                ))
            }
        case POSTS_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        default:
            return state
    }
}