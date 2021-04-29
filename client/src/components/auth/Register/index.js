import React, { memo } from "react"
import { FaUserAlt } from "react-icons/fa"
import { Button, Form } from "react-bootstrap"
import { Formik } from "formik"
import * as yup from "yup"
import { connect } from "react-redux"
import { register } from "../../../actions"
import PropTypes from "prop-types"
import { Redirect } from "react-router-dom"

const Register = memo(({ isAuthenticated, register }) => {
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />
  }
  const schema = yup.object({
    name: yup.string().required("Name is required"),
    email: yup.string().required("Email is required"),
    password: yup
      .string()
      .required()
      .min(6, "Seems a bit short...")
      .max(10, "We prefer insecure system, try a shorter password."),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Password confirm is required"),
  })
  return (
    <React.Fragment>
      <div className='register'>
        <h1 className='heading'>Sign Up</h1>
        <h3>
          <FaUserAlt />
          <span className='create-account-heading'>
            Create Your Own Account
          </span>
        </h3>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            passwordConfirm: "",
          }}
          validationSchema={schema}
          onSubmit={(values, actions) => {
            register(values.name, values.email, values.password)
            actions.setSubmitting(false)
          }}
        >
          {({ handleSubmit, errors, values, handleChange, touched }) => {
            return (
              <Form noValidate onSubmit={handleSubmit} className='form-fields'>
                <Form.Control
                  placeholder='Name'
                  type='text'
                  name='name'
                  value={values.name}
                  onChange={handleChange("name")}
                  isValid={touched.name && !errors.name}
                  isInvalid={touched.name && !!errors.name}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.name}
                </Form.Control.Feedback>
                <Form.Control
                  type='email'
                  placeholder='Enter email'
                  onChange={handleChange("email")}
                  value={values.email}
                  name='email'
                  isValid={touched.email && !errors.email}
                  isInvalid={touched.email && !!errors.email}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.email}
                </Form.Control.Feedback>
                <Form.Text className='text-muted'>
                  This site uses Gravatar so if you want a profile image, use a
                  Gravatar email
                </Form.Text>

                <Form.Control
                  type='password'
                  placeholder='Password'
                  name='password'
                  onChange={handleChange("password")}
                  value={values.password}
                  isValid={touched.password && !errors.password}
                  isInvalid={touched.password && !!errors.password}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.password}
                </Form.Control.Feedback>
                <Form.Control
                  type='password'
                  placeholder='Confirm Password'
                  name='passwordConfirm'
                  onChange={handleChange("passwordConfirm")}
                  value={values.passwordConfirm}
                  isValid={touched.passwordConfirm && !errors.passwordConfirm}
                  isInvalid={
                    touched.passwordConfirm && !!errors.passwordConfirm
                  }
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.passwordConfirm}
                </Form.Control.Feedback>
                <Button variant='info' type='submit'>
                  Register
                </Button>
              </Form>
            )
          }}
        </Formik>
        <div>
          {" "}
          Already have an account ? <a href='/login'> Sign in </a>
        </div>
      </div>
    </React.Fragment>
  )
})
Register.propTypes = {
  register: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
})
export default connect(mapStateToProps, { register })(Register)
