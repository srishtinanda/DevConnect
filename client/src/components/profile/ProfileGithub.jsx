import React, { useEffect } from "react"
import Spinner from "../spinner"
import { getGithubRepos } from "../../actions"
import { ListGroup } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"

const ProfileGithub = ({ username }) => {
  const dispatch = useDispatch()
  const { repos } = useSelector((state) => state.profile)
  
  useEffect(() => {
    dispatch(getGithubRepos(username))
  }, [dispatch, username])

  return (
    <div className='container card'>
      <h3 style={{ paddingTop: "20px", color: "#156161", textAlign: "center" }}>
        Github Repos
      </h3>
      {repos === null ? (
        <Spinner />
      ) : (
        <ListGroup>
          {repos.map((repo) => (
            <div key={repo.id}>
              <ListGroup.Item
                action
                href={repo.html_url}
                target='_blank'
                rel='noopener noreferrer'
              >
                {repo.name}
              </ListGroup.Item>
            </div>
          ))}
        </ListGroup>
      )}
    </div>
  )
}

export default ProfileGithub
