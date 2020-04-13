import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { FaUserAlt } from 'react-icons/fa';
import { Formik } from 'formik'
import * as yup from 'yup';
import { dropDownOptions, fields , socialMediaFields } from './helperConstants'

const CreateProfile = () => {
    const schema = yup.object({
        skills: yup.string()
        .required('Skills are required'),
        select: yup.string().required('This field is required')
      })
    const [displaySocialInputs, toggleSocialInputs] = useState(false)
    const socialInputs = () => toggleSocialInputs(!displaySocialInputs)
   
    return (
    <div className ='create-profile-page'>
    <h1 className='heading'>Create Your Profile</h1>
    <FaUserAlt />
    <span className='heading-description'>
        Let's get some information to make your profile stand out
    </span>
    <Formik
      initialValues={{
        select: "",
        company: "",
        website: "",
        location: "",
        skills: "",
        githubUsername: "",
        shortBio: "",
        twitter: "",
        facebook: "",
        youTube: "",
        linkedIn: "",
        instagram: ""
      }}
      validationSchema={schema}
      onSubmit={(values, actions) => {
        console.log(values,'valuezs', actions)
        // actions.setSubmitting(false);
      }}
    >
      {({handleSubmit,
      errors,
      handleBlur,
      values,
      handleChange,
      touched
    }) => (
    <Form noValidate onSubmit={handleSubmit}
      className="form-fields">
        <Form.Control as="select"
            name='select'
            onChange={handleChange}
            isValid={touched.select && !errors.select}
            isInvalid={!!errors.select}
            >
            {dropDownOptions.map((item, key) => (
                    <option key={key}
                    >{item.label}</option>
                )
            )}
         </Form.Control>
        <Form.Control.Feedback type="invalid">
            {errors.select}
        </Form.Control.Feedback>
         {fields.map((field, key) => {
             return(<div key={key}>
                <Form.Label>
                    {field.label}
                </Form.Label>
                <Form.Control 
                    as={field?.isTextArea ? "textarea" : "input" }
                    name={field.name}
                    onChange={handleChange}
                    placeholder={field?.mandatory ? `* ${field.label}`: field.label}
                    isValid={field?.mandatory && touched[field.name] && !errors[field.name]}
                    isInvalid={!!errors[field.name]}
                />
                <Form.Text className="text-muted">
                    {field.supportiveText}
                </Form.Text>
                <Form.Control.Feedback type="invalid">
                    {errors.name}
                </Form.Control.Feedback>
             </div>)
         })}
        <Button onClick={socialInputs} variant="outline-secondary" type="button">
          Add Social Network Links
        </Button>
        <Form.Text className="button-child text-muted">
            Optional
        </Form.Text>
        {displaySocialInputs && 
        socialMediaFields.map((field, key) => {
            const Icon = field.icon
            return(<div key={key} className="social-links">
               <Icon color={field.color} size={30} />
               <Form.Control
                   name={field.name}
                   onChange={handleChange}
                   placeholder={field.label}
               />
            </div>)
        })}
        <Button variant="info" type="submit">
          Submit
        </Button>
        <Button variant="secondary" type="button">
          Go back
        </Button>
    </Form>
    )}
    </Formik>
    </div>)}

export default CreateProfile