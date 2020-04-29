import React from 'react'
import { Button, ListGroup, Card } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { FaCheck, FaUserAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const ProfileItem = ({ profile: { 
    user: { _id, name },
    status,
    company,
    location,
    skills
}}) => {

    return (<Card className="container profile-item">
    <div className="row">
    <div className="col-sm image">
    <FaUserAlt size={180} color='grey'/>
    </div>
    <div className="col-sm">
        <h2>{name}</h2>
        <p>{status} {company && <span>
            at {company}
        </span>}</p>
        <p>{location && <span>
            {location}
        </span>}</p>
        <Link to={`/profile/${_id}`}>
        <Button variant="outline-info">View Profile
        </Button>
        </Link>
    </div>
    <div className="col-sm">
    <ListGroup>
        {skills.map((skill,index) => (
            <ListGroup.Item key={index}>
             <FaCheck color='#17a2b8'/>   {skill}
            </ListGroup.Item>
        ))}
    </ListGroup>
    </div>
    </div>
    </Card>)
}

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired
}
// const mapStateToProps = state => ({
//     profile: state.profile
// })
export default ProfileItem
