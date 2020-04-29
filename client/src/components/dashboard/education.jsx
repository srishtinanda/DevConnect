import React from 'react'
import { Table, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import Proptypes from 'prop-types'
import Moment from 'react-moment'
import { deleteEducation } from '../../actions';

const Education = ({ education, deleteEducation }) => {
    console.log(education, 'from experience')
    const educations = education?.map((edu) => {
       return( <tr key={edu._id}>
        <td>{edu.school}</td>
            <td>{edu.degree}</td>
            <td>
                <Moment format="DD/MM/YYYY">
                    {edu.from}
                </Moment>
                -
                {edu.current ?
                'Now' :
                <Moment format="DD/MM/YYYY">
                    {edu.to}
                </Moment>}
            </td>
            <td>
                <Button variant="outline-danger"
                onClick={()=> deleteEducation(edu._id)}
                >Delete</Button>
            </td>
        </tr>
    )})
    return (<div className='experience-list'>
    <h3> Education Credentials </h3>
    <Table striped bordered hover responsive variant="light">
  <thead>
    <tr>
      <th>School</th>
      <th>Degree</th>
      <th>Years</th>
    </tr>
  </thead>
  <tbody>
    {educations}
  </tbody>
</Table></div>)
}
Education.propTypes = {
    education: Proptypes.array.isRequired,
    deleteEducation: Proptypes.func.isRequired
}

export default connect(null, {deleteEducation})(Education)
