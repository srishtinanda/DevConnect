import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import { IoIosGitBranch } from 'react-icons/io'
import { connect } from 'react-redux'
import Proptypes from 'prop-types'
import { Formik } from 'formik'
import * as yup from 'yup';
import { addEducation } from '../../actions'

const AddEducation = ({ addEducation, history }) => {
    const schema = yup.object({
        school: yup.string().required('This field is required'),
        degree: yup.string().required('This field is required'),
        fieldofstudy: yup.string().required('This field is required'),
        from: yup.date().required('This field is required'),
        to: yup.string().when('current', {
            is: false,
            then: yup.string()
              .required('This field is required'),
            otherwise: yup.string().notRequired(),
        }),
      })   
    return (
    <div className ='add-education-page'>
    <h1 className='heading'>Add Education</h1>
    <IoIosGitBranch />
    <span className='heading-description'>
    Add any school/bootcamp that you have attended
    </span>
    <Formik
      initialValues={{
        school: "",
        degree: "",
        fieldofstudy: "",
        from: "",
        current: false,
        to: "",
        description: "",
      }}
      validationSchema={schema}
      onSubmit={(values, actions) => {
        console.log(values,'valuezs', actions)
        // actions.addExperience(false);
        addEducation(values, history)
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
          * School
        </Form.Label>
        <Form.Control 
        placeholder="School"
        type="text"
        name="school"
        value={values.school}
        onChange={handleChange('school')}
        isValid={touched.school && !errors.school}
        isInvalid={!!errors.school}
      />
        <Form.Control.Feedback type="invalid">
          {errors.school}
        </Form.Control.Feedback>
        <Form.Label>
          * Degree
        </Form.Label>
        <Form.Control 
          type="text" 
          placeholder="Degree" 
          onChange={handleChange('degree')}
          value={values.degree}
          name="degree"
          isValid={touched.degree && !errors.degree}
          isInvalid={!!errors.degree}
        />
        <Form.Control.Feedback type="invalid">
          {errors.degree}
        </Form.Control.Feedback>
        <Form.Label>
          Field Of Study
        </Form.Label>
        <Form.Control 
          type="text" 
          placeholder="Field Of Study"
          name="fieldofstudy"
          onChange={handleChange('fieldofstudy')}
          value={values.fieldofstudy}
          isValid={touched.fieldofstudy && !errors.fieldofstudy}
          isInvalid={!!errors.fieldofstudy}
        />
        <Form.Control.Feedback type="invalid">
          {errors.fieldofstudy}
        </Form.Control.Feedback>
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
          label="Current"
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
          Program Description
        </Form.Label>
        <Form.Control 
          placeholder="Program Description"
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
AddEducation.propTypes = {
  addEducation: Proptypes.func.isRequired
}

export default connect(null, {addEducation})(withRouter(AddEducation))
