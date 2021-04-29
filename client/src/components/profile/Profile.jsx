import React, { Fragment, useEffect } from "react"
import Spinner from "../spinner"
import { getProfileById } from "../../actions"
import { Button, Card } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import ProfileTop from "./ProfileTop"
import ProfileAbout from "./ProfileAbout"
import ProfileExperience from "./ProfileExperience"
import ProfileEducation from "./ProfileEducation"
import ProfileGithub from "./ProfileGithub"

const Profile = ({ match }) => {
  const dispatch = useDispatch()
  const profile = useSelector((state) => state.profile)
  const auth = useSelector((state) => state.auth)
  
  useEffect(() => {
    dispatch(getProfileById(match.params.id))
  }, [match.params.id, dispatch])

  return (
    <>
      {profile.profile === null || profile.loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to={`/profiles`}>
            <Button variant='outline-info'>Back To Profiles</Button>
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.profile.user._id && (
              <Link to={`/edit-profile`}>
                <Button variant='outline-info'>Edit Profile</Button>
              </Link>
            )}
          <ProfileTop profile={profile.profile} />
          <ProfileAbout profile={profile.profile} />
          <div className='container'>
            <div className='row'>
              <div className='card col'>
                <h4
                  style={{
                    paddingTop: "20px",
                    color: "#156161",
                    textAlign: "center",
                  }}
                >
                  Experience
                </h4>
                <Card.Body>
                  {profile.profile.experience.length > 0 ? (
                    <>
                      {profile.profile.experience.map((exp, i) => {
                        console.log(
                          i,
                          i === profile.profile.experience.length - 1
                        )
                        return (
                          <ProfileExperience
                            key={exp._id}
                            experience={exp}
                            isLastItem={
                              i === profile.profile.experience.length - 1
                            }
                          />
                        )
                      })}
                    </>
                  ) : (
                    <h4> No Experience Credentials </h4>
                  )}
                </Card.Body>
              </div>
              <div className='card col'>
                <h4
                  style={{
                    paddingTop: "20px",
                    color: "#156161",
                    textAlign: "center",
                  }}
                >
                  Education
                </h4>
                <Card.Body>
                  {profile.profile.education.length > 0 ? (
                    <>
                      {profile.profile.education.map((edu, i) => (
                        <ProfileEducation
                          key={edu._id}
                          education={edu}
                          isLastItem={
                            i === profile.profile.education.length - 1
                          }
                        />
                      ))}
                    </>
                  ) : (
                    <h4> No Education Credentials </h4>
                  )}
                </Card.Body>
              </div>
            </div>
          </div>
          {profile.profile.githubusername && (
            <ProfileGithub username={profile.profile.githubusername} />
          )}
        </Fragment>
      )}
    </>
  )
}

export default Profile
