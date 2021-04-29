import React from "react"
import Moment from "react-moment"

const ProfileExperience = ({
  experience: { company, location, current, from, title, to, description },
  isLastItem,
}) => {
  return (
    <div className='profile-experience-display'>
      <p>{company}</p>
      <p>
        <Moment format='DD/MM/YYYY'>{from}</Moment>-
        {current ? "Now" : <Moment format='DD/MM/YYYY'>{to}</Moment>}
      </p>
      <p>
        <strong>Position:</strong> {title}
      </p>
      <p>
        <strong>Description:</strong> {description}
      </p>
      {!isLastItem && <hr />}
    </div>
  )
}

export default ProfileExperience
