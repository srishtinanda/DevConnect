import React, { useState } from 'react'
import { Button, Accordion, Form, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Moment from 'react-moment'
import { addLikes, removeLike, deletePost, addPost, addComment } from '../../actions'

const Comment = ({ postId }) => {
    const [text, setText] = useState('')
    const dispatch = useDispatch()
    const handlePost = (e) => {
      e.preventDefault()
      dispatch(addComment( postId, {text}))
      setText('')
    }
    return ( <div className="container post-Form">
      <Accordion defaultActiveKey="0">
  <Card>
    <Accordion.Toggle as={Card.Header} eventKey="0">
      Leave a comment....
    </Accordion.Toggle>
    <Accordion.Collapse eventKey="0">
      <Card.Body>
      <Form>
      <Form.Control as="textarea"
      placeholder="Create a post"
      value={text}
      onChange={(e) => setText(e.target.value)}
      required/>
      <Button variant="info" type="submit" onClick={handlePost}>
        Submit
      </Button>
      </Form>
      </Card.Body>
    </Accordion.Collapse>
  </Card>
  </Accordion>
    </div> )
}

export default Comment
