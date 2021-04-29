import React from "react"
import Moment from "react-moment"

const ProfileEducation = ({
  education: { degree, fieldofstudy, school, current, from, to, description },
  isLastItem,
}) => {
  return (
    <div className='profile-experience-display'>
      <p>{school}</p>
      <p>
        <Moment format='DD/MM/YYYY'>{from}</Moment>-
        {current ? "Now" : <Moment format='DD/MM/YYYY'>{to}</Moment>}
      </p>
      <p>
        <strong>Degree:</strong> {degree}
      </p>
      <p>
        <strong>Field Of Study:</strong> {fieldofstudy}
      </p>
      <p>
        <strong>Description:</strong> {description}
      </p>
      {!isLastItem && <hr />}
    </div>
  )
}

export default ProfileEducation
