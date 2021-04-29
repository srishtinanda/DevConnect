import React from "react"
import { Button, Card } from "react-bootstrap"
import { FaUserAlt, FaWindowClose } from "react-icons/fa"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import Moment from "react-moment"
import { deleteComment } from "../../actions"

const CommentList = ({
  comment: { _id, text, name, avatar, user, date },
  postId,
}) => {
  const auth = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  return (
    <Card className='container post-item'>
      <div className='row'>
        <div className='col-md-3 image'>
          <Link to={`/profile/${user}`}>
            <FaUserAlt size={120} color='grey' />
            <div className='name'>{name}</div>
          </Link>
        </div>
        <div className='col'>
          <p>{text}</p>
          <div className='text-muted'>
            Posted on: <Moment format='DD/MM/YYYY HH:mm:ss'>{date}</Moment>
          </div>
          {!auth.loading && user === auth.user._id && (
            <Button
              variant='danger'
              onClick={(e) => dispatch(deleteComment(postId, _id))}
            >
              <FaWindowClose style={{ color: "white" }} />
            </Button>
          )}
        </div>
      </div>
    </Card>
  )
}

export default CommentList
