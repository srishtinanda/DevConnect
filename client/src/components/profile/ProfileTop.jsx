import React, { Fragment, useEffect } from 'react'
import Spinner from '../spinner'
import { getAllProfiles, getProfileById } from '../../actions'
import { Button, Card } from 'react-bootstrap'
import {
    FaUserAlt,
    FaTwitter,
    FaFacebook,
    FaYoutube,
    FaLinkedin,
    FaInstagram,
    FaGlobe,
} from 'react-icons/fa';
import { Link } from 'react-router-dom'
import { socialMediaFields } from '../profile-form/helperConstants'

const ProfileTop = ({ profile:
{
    company,
    website,
    status,
    location,
    social,
    user: {
        name,
        avatar
    }
} }) => {
    return (<div className='profile-top'>
    <Card style={{ backgroundColor: '#156161', textAlign: 'center' }}>
  <Card.Body style={{ color: 'white'}}>
    <h2>{name}</h2>
    <Card.Text>
      {status} {company && `at ${company}`}
    </Card.Text>
    <Card.Text>
      {location}
    </Card.Text>
    <span>
    {website && <a href = {website} target='_blank'><FaGlobe /></a>}
    {socialMediaFields.map((field, i) => {
        const Icon = field.icon
        const name = social[field.name]
        return (name && <a key={i} href = {name} target='_blank'>
        <Icon color='white'/>
        </a>
        )
    })}  
    </span>
  </Card.Body>
</Card>
    </div>)
     
}

export default ProfileTop
