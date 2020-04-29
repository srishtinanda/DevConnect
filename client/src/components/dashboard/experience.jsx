import React from 'react'
import { Table, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import Proptypes from 'prop-types'
import Moment from 'react-moment'
import { deleteExperience } from '../../actions'

const Experience = ({ experience, deleteExperience }) => {
    console.log(experience, 'from experience')
    const experiences = experience?.map((exp) => {
       return( <tr key={exp._id}>
        <td>{exp.company}</td>
            <td>{exp.title}</td>
            <td>
                <Moment format="DD/MM/YYYY">
                    {exp.from}
                </Moment>
                -
                {exp.current ?
                'Now' :
                <Moment format="DD/MM/YYYY">
                    {exp.to}
                </Moment>}
            </td>
            <td>
                <Button variant="outline-danger"
                onClick={()=> deleteExperience(exp._id)}>Delete</Button>
            </td>
        </tr>
    )})
    return (<div className='experience-list'>
    <h3> Experience Credentials </h3>
    <Table striped bordered hover responsive variant="light">
  <thead>
    <tr>
      <th>Company</th>
      <th>Title</th>
      <th>Years</th>
    </tr>
  </thead>
  <tbody>
    {experiences}
  </tbody>
</Table></div>)
}
Experience.propTypes = {
    experience: Proptypes.array.isRequired,
    deleteExperience: Proptypes.func.isRequired
}

export default connect(null, {deleteExperience})(Experience)
