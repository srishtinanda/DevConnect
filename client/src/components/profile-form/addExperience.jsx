import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom'
import { IoIosGitBranch } from 'react-icons/io'
import { connect } from 'react-redux'
import Proptypes from 'prop-types'
import { Formik } from 'formik'
import * as yup from 'yup';
import { addExperience } from '../../actions'

const AddExperience = ({ addExperience, history }) => {
    const schema = yup.object({
        title: yup.string().required('This field is required'),
        company: yup.string().required('This field is required'),
        from: yup.string().required('This field is required'),
        from: yup.date().required('This field is required'),
        to: yup.string().when('current', {
          is: false,
          then: yup.string()
            .required('This field is required'),
          otherwise: yup.string().notRequired(),
      }),
      })
    const [displaySocialInputs, toggleSocialInputs] = useState(false)
    const socialInputs = () => toggleSocialInputs(!displaySocialInputs)
   
    return (
    <div className ='add-experience-page'>
    <h1 className='heading'>Add Experience</h1>
    <IoIosGitBranch />
    <span className='heading-description'>
    Add any developer/programming positions that you had in the past
    </span>
    <Formik
      initialValues={{
        title: "",
        company: "",
        location: "",
        from: "",
        current: false,
        to: "",
        description: "",
      }}
      validationSchema={schema}
      onSubmit={(values, actions) => {
        console.log(values,'valuezs', actions)
        // actions.addExperience(false);
        addExperience(values, history)
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
        <Form.Label>
          * Job Title
        </Form.Label>
        <Form.Control 
        placeholder="Job Title"
        type="text"
        name="title"
        value={values.title}
        onChange={handleChange('title')}
        isValid={touched.title && !errors.title}
        isInvalid={!!errors.title}
      />
        <Form.Control.Feedback type="invalid">
          {errors.title}
        </Form.Control.Feedback>
        <Form.Label>
          * Company
        </Form.Label>
        <Form.Control 
          type="text" 
          placeholder="Company" 
          onChange={handleChange('company')}
          value={values.company}
          name="company"
          isValid={touched.company && !errors.company}
          isInvalid={!!errors.company}
        />
        <Form.Control.Feedback type="invalid">
          {errors.company}
        </Form.Control.Feedback>
        <Form.Label>
          Location
        </Form.Label>
        <Form.Control 
          type="text" 
          placeholder="Location"
          name="location"
          onChange={handleChange('location')}
          value={values.location}
        />
        <Form.Label>
          From Date
        </Form.Label>
        <Form.Control 
          type="date"
          name="from"
          onChange={handleChange('from')}
          value={values.from}
          isValid={touched.from && !errors.from}
          isInvalid={!!errors.from}
        />
        <Form.Control.Feedback type="invalid">
          {errors.from}
        </Form.Control.Feedback>
        <Form.Check
          name="current"
          label="Current Job"
          disabled={values.to}
          onChange={handleChange('current')}
          isInvalid={!!errors.current}
          feedback={errors.current}
        />
        <Form.Label>
          To Date
        </Form.Label>
        <Form.Control 
          type="date"
          name="to"
          onChange={handleChange('to')}
          value={values.to}
          disabled={values.current}
          isValid={touched.to && !errors.to}
          isInvalid={!!errors.to}
          />
          <Form.Control.Feedback type="invalid">
            {errors.to}
          </Form.Control.Feedback>
        <Form.Label>
          Job Description
        </Form.Label>
        <Form.Control 
          placeholder="Job Description"
          as="textarea"
          name="description"
          value={values.description}
          onChange={handleChange('description')}
        />
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
    </div>)
}
AddExperience.propTypes = {
  addExperience: Proptypes.func.isRequired
}

export default connect(null, {addExperience})(withRouter(AddExperience))
