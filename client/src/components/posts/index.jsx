import React, { Fragment, useEffect } from "react"
import Spinner from "../spinner"
import { getPosts } from "../../actions"
import { useSelector, useDispatch } from "react-redux"
import { FaUserAlt } from "react-icons/fa"
import PostItem from "./PostItem"
import PostForm from "./PostForm"

const Posts = () => {
  const dispatch = useDispatch()
  const { posts, loading } = useSelector((state) => state.posts)
  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch])

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className='post-heading'>Posts</h1>
          <FaUserAlt />
          <span className='posts-heading'>Welcome to the communtity</span>
          <PostForm />
          {posts.map((post) => (
            <PostItem key={post._id} post={post} showActions />
          ))}
        </Fragment>
      )}
    </>
  )
}

export default Posts
