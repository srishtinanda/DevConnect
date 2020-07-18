import React from 'react'
import { Button, ButtonGroup, Card } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { AiFillLike, AiFillDislike } from 'react-icons/ai'
import { FaUserAlt, FaWindowClose } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Moment from 'react-moment'
import { addLikes, removeLike, deletePost } from '../../actions'

const PostItem = ( { post: {
    _id,
    text,
    name,
    avatar,
    user,
    likes,
    comments,
    date
},
showActions } ) => {
    const auth = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    return ( <Card className="container post-item">
        <div className="row">
            <div className="col-md-3 image">
                <Link to={`/profile/${user}`}>
                <FaUserAlt size={120} color='grey'/>
                <div className="name">{name}</div>
                </Link>
            </div>
            <div className="col">
                <p>{text}</p>
                <div className="text-muted">Posted on: <Moment format="DD/MM/YYYY HH:mm:ss">
                    {date}
                </Moment></div>
                {showActions && <ButtonGroup>
                <Button variant="outline"
                    onClick={(e) => dispatch(addLikes(_id))}>
                    <AiFillLike />
                    {likes ?.length > 0 && likes.length}
                </Button>
                <Button variant="outline"
                    onClick={(e) => dispatch(removeLike(_id))}>
                    <AiFillDislike />
                </Button>
                <Link to={`/post/${_id}`}>
                    <Button variant="info">Discussions{comments ?.length}</Button>
                </Link>
                {!auth.loading && user === auth.user._id &&
                    <Button variant="danger"
                    onClick={(e) => dispatch(deletePost(_id))}
                    ><FaWindowClose style={{ color: 'white' }} /></Button>}
                </ButtonGroup>}
            </div>
        </div>
    </Card> )
}

export default PostItem
