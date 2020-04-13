import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { login } from '../../../actions'
import { Redirect } from 'react-router-dom'

const Login = ({login, isAuthenticated}) => {
  const handleLogin = (e) => {
    const userName = document.getElementById("emailId").value;
    const password = document.getElementById("userPassword").value;
    e.preventDefault()
    login(userName, password)
  }
  if(isAuthenticated) {
    return <Redirect to ='/dashboard'/>
  }
return (
    <Form>
    <Form.Group controlId="emailId">
      <Form.Label>Email address</Form.Label>
      <Form.Control type="email" placeholder="Enter email" />
      <Form.Text className="text-muted">
        We'll never share your email with anyone else.
      </Form.Text>
    </Form.Group>
  
    <Form.Group controlId="userPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Password" />
    </Form.Group>
    <Button variant="primary" type="submit" onClick={handleLogin}>
      Submit
    </Button>
  </Form>
)}
Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login);
