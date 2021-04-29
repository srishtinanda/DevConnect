import React from "react"
import { Card } from "react-bootstrap"
import { FaCheck } from "react-icons/fa"

const ProfileAbout = ({
  profile: {
    bio,
    skills,
    user: { name },
  },
}) => {
  const textColor = ["#156161", "black"]
  return (
    <div className='profile-about'>
      <Card style={{ backgroundColor: "#dbe5e5", textAlign: "center" }}>
        <Card.Body style={{ color: textColor[1] }}>
          <Card.Title style={{ color: textColor[0] }}>
            {bio && `${name}s bio`}
          </Card.Title>
          <Card.Text>{bio}</Card.Text>
        </Card.Body>
        <hr />
        <Card.Body style={{ color: textColor[1] }}>
          <Card.Title style={{ color: textColor[0] }}>Skills</Card.Title>
          <Card.Text>
            {skills.map((skill, index) => (
              <span key={index} className='skill-item'>
                <FaCheck />
                {skill}
              </span>
            ))}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  )
}

export default ProfileAbout
