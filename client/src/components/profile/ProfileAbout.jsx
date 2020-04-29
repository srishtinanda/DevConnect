import React, { Fragment, useEffect } from 'react'
import Spinner from '../spinner'
import { getAllProfiles, getProfileById } from '../../actions'
import { Button, Card } from 'react-bootstrap'
import { FaCheck } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const ProfileAbout = ({ profile:
{
    bio,
    skills,
    user: {
        name
    },
} }) => {
  const textColor = ['#156161', 'black']
    return (<div className='profile-about'>
    <Card style={{ backgroundColor: '#dbe5e5', textAlign: 'center' }}>
  <Card.Body style={{ color: textColor[1]}}>
    <Card.Title  style={{ color: textColor[0]}}>
      {bio &&
    `${name}s bio`}
    </Card.Title>
    <Card.Text>
    {bio &&
    <div>{bio}</div>}
    </Card.Text> 
  </Card.Body>
  <hr />
  <Card.Body style={{ color: textColor[1]}}>
    <Card.Title style={{ color: textColor[0]}}>
      Skills
    </Card.Title>
    <Card.Text>
        {skills.map((skill,index) => (
            <span key={index} className='skill-item'>
             <FaCheck/>{skill}
            </span>
        ))}
    </Card.Text> 
  </Card.Body>
</Card>
    </div>)
     
}

export default ProfileAbout
