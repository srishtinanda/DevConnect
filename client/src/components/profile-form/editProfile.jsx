import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom'
import { FaUserAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import Proptypes from 'prop-types'
import { Formik } from 'formik'
import * as yup from 'yup';
import { dropDownOptions, fields , socialMediaFields } from './helperConstants'
import { createProfile, getCurrentProfile } from '../../actions'

const EditProfile = ({ history }) => {
    const schema = yup.object({
        skills: yup.string()
        .required('Skills are required'),
        status: yup.string().required('This field is required')
      })
    const [displaySocialInputs, toggleSocialInputs] = useState(false)
    const stateProfile = useSelector(state => state.profile)
    const profileState = stateProfile.profile
    const loadingState = stateProfile.loading
    const dispatch = useDispatch()
    const socialInputs = () => toggleSocialInputs(!displaySocialInputs)
   useEffect(() => {
    dispatch(getCurrentProfile())
   }, [loadingState])
    return (
    <div className ='create-profile-page'>
    <h1 className='heading'>Edit Your Profile</h1>
    <FaUserAlt />
    <span className='heading-description'>
        Let's get some information to make your profile stand out
    </span>
    <Formik
      initialValues={{
        status: !profileState?.status ? "" : profileState.status,
        company: !profileState?.company ? "" : profileState.company,
        website: !profileState?.website ? "" : profileState.website,
        location: !profileState?.location ? "" : profileState.location,
        skills: !profileState?.skills ? "" : profileState.skills.join(','),
        githubusername: !profileState?.githubusername ? "" : profileState.githubusername,
        bio: !profileState?.bio ? "" : profileState.bio,
        twitter: !profileState?.social ? "" : profileState.social.twitter,
        facebook: !profileState?.social ? "" : profileState.social.facebook,
        youtube: !profileState?.social ? "" : profileState.social.youtube,
        linkedin: !profileState?.social ? "" : profileState.social.linkedin,
        instagram: !profileState?.social ? "" : profileState.social.instagram
      }}
      enableReinitialize={true}
      validationSchema={schema}
      onSubmit={(values, actions) => {
        console.log(values,'valuezs', actions)
        // actions.CreateProfile(false);
        dispatch(createProfile(values, history, true))
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
            name='status'
            onChange={handleChange}
            value={values.status}
            isValid={touched.status && !errors.status}
            isInvalid={!!errors.status}
            >
            {dropDownOptions.map((item, key) => (
                    <option key={key}
                        disabled={!item.value}
                    >{item.label}</option>
                )
            )}
         </Form.Control>
        <Form.Control.Feedback type="invalid">
            {errors.status}
        </Form.Control.Feedback>
         {fields.map((field, key) => {
             console.log(values, 'bhsdbfghoeiuwdpem iohdoisnoiewnd', profileState)
             return(<div key={key}>
                <Form.Label>
                    {field.label}
                </Form.Label>
                <Form.Control 
                    as={field?.isTextArea ? "textarea" : "input" }
                    name={field.name}
                    onChange={handleChange}
                    value={values[field.name]}
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
                   value={values[field.name]}
                   placeholder={field.label}
               />
            </div>)
        })}
        <Button variant="info" type="submit">
          Submit
        </Button>
        <Button variant="secondary" type="button"
        href='/dashboard'>
          Go back
        </Button>
    </Form>
    )}
    </Formik>
    </div>)}

export default withRouter(EditProfile)
