import React, { Fragment, useEffect } from "react"
import Spinner from "../spinner"
import { getPost } from "../../actions"
import { useSelector, useDispatch } from "react-redux"
import PostItem from "./PostItem"
import { Button } from "react-bootstrap"
import Comment from "./AddComment"
import CommentList from "./CommentList"

const Post = ({ match }) => {
  const dispatch = useDispatch()
  const { post, loading } = useSelector((state) => state.posts)
  useEffect(() => {
    dispatch(getPost(match.params.id))
  }, [dispatch, match])
  console.log("post", post)
  return (
    <>
      {loading || post === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <Button href='/posts' variant='secondary'>
            Back To Posts
          </Button>
          <PostItem post={post} showActions={false} />
          <Comment postId={post._id} />
          {post?.Comment.map((comment) => (
            <CommentList
              key={comment._id}
              comment={comment}
              postId={post._id}
            />
          ))}
        </Fragment>
      )}
    </>
  )
}

export default Post
