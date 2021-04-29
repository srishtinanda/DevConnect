import React, { useState } from "react"
import { Form, Button } from "react-bootstrap"
import { withRouter } from "react-router-dom"
import { FaUserAlt } from "react-icons/fa"
import { connect } from "react-redux"
import Proptypes from "prop-types"
import { Formik } from "formik"
import * as yup from "yup"
import { dropDownOptions, fields, socialMediaFields } from "./helperConstants"
import { createProfile } from "../../actions"

const CreateProfile = ({ createProfile, history }) => {
  const schema = yup.object({
    skills: yup.string().required("Skills are required"),
    status: yup.string().required("This field is required"),
  })
  const [displaySocialInputs, toggleSocialInputs] = useState(false)
  const socialInputs = () => toggleSocialInputs(!displaySocialInputs)

  return (
    <div className='create-profile-page'>
      <h1 className='heading'>Create Your Profile</h1>
      <FaUserAlt />
      <span className='heading-description'>
        Let's get some information to make your profile stand out
      </span>
      <Formik
        initialValues={{
          status: "",
          company: "",
          website: "",
          location: "",
          skills: "",
          githubusername: "",
          bio: "",
          twitter: "",
          facebook: "",
          youTube: "",
          linkedIn: "",
          instagram: "",
        }}
        validationSchema={schema}
        onSubmit={(values, actions) => {
          createProfile(values, history)
        }}
      >
        {({
          handleSubmit,
          errors,
          handleBlur,
          values,
          handleChange,
          touched,
        }) => (
          <Form noValidate onSubmit={handleSubmit} className='form-fields'>
            <Form.Control
              as='select'
              name='status'
              onChange={handleChange}
              isValid={touched.status && !errors.status}
              isInvalid={!!errors.status}
            >
              {dropDownOptions.map((item, key) => (
                <option key={key} selected={!item.value} disabled={!item.value}>
                  {item.label}
                </option>
              ))}
            </Form.Control>
            <Form.Control.Feedback type='invalid'>
              {errors.status}
            </Form.Control.Feedback>
            {fields.map((field, key) => {
              return (
                <div key={key}>
                  <Form.Label>{field.label}</Form.Label>
                  <Form.Control
                    as={field?.isTextArea ? "textarea" : "input"}
                    name={field.name}
                    onChange={handleChange}
                    placeholder={
                      field?.mandatory ? `* ${field.label}` : field.label
                    }
                    isValid={
                      field?.mandatory &&
                      touched[field.name] &&
                      !errors[field.name]
                    }
                    isInvalid={!!errors[field.name]}
                  />
                  <Form.Text className='text-muted'>
                    {field.supportiveText}
                  </Form.Text>
                  <Form.Control.Feedback type='invalid'>
                    {errors.name}
                  </Form.Control.Feedback>
                </div>
              )
            })}
            <Button
              onClick={socialInputs}
              variant='outline-secondary'
              type='button'
            >
              Add Social Network Links
            </Button>
            <Form.Text className='button-child text-muted'>Optional</Form.Text>
            {displaySocialInputs &&
              socialMediaFields.map((field, key) => {
                const Icon = field.icon
                return (
                  <div key={key} className='social-links'>
                    <Icon color={field.color} size={30} />
                    <Form.Control
                      name={field.name}
                      onChange={handleChange}
                      placeholder={field.label}
                    />
                  </div>
                )
              })}
            <Button variant='info' type='submit'>
              Submit
            </Button>
            <Button variant='secondary' type='button' href='/dashboard'>
              Go back
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

CreateProfile.propTypes = {
  createProfile: Proptypes.func.isRequired,
}

export default connect(null, { createProfile })(withRouter(CreateProfile))
