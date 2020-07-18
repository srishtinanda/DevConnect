import React, { Fragment, useEffect } from 'react'
import Spinner from '../spinner'
import { getAllProfiles, getProfileById } from '../../actions'
import { Button, Card } from 'react-bootstrap'
import { FaCheck } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'

const ProfileExperience = ({ experience:
{
    company,
    location,
    current,
    from,
    title,
    to,
    description,
},
isLastItem }) => {
  const textColor = ['#156161', 'black']
    return (<div className='profile-experience-display'>
     <p>
        {company}
     </p>
     <p>
        <Moment format="DD/MM/YYYY">
            {from}
        </Moment>
        -
        {current ?
        'Now' :
        <Moment format="DD/MM/YYYY">
            {to}
        </Moment>}
    </p>
    <p>
        <strong>Position:</strong> {title}
    </p>
    <p>
        <strong>Description:</strong> {description}
    </p>
    {!isLastItem && <hr/>}
    </div>)
     
}

export default ProfileExperience
