import React, { Fragment, useEffect } from 'react'
import Spinner from '../spinner'
import { getGithubRepos } from '../../actions'
import { Button, Card, ListGroup } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { socialMediaFields } from '../profile-form/helperConstants'

const ProfileGithub = ({ username }) => {
    const dispatch = useDispatch()
    const { repos } = useSelector(state => state.profile)
    useEffect(() => {
        dispatch(getGithubRepos(username))
    }, [getGithubRepos])
    console.log(repos, 'my respois')
    return (<div className='container card'>
    <h3 style={{ paddingTop: '20px', color: '#156161', textAlign: 'center' }}>
        Github Repos
    </h3>
    {repos === null ? <Spinner /> :
    (<ListGroup>
    {repos.map((repo) => (
        <div key={repo.id}>
        <ListGroup.Item action href={repo.html_url}
             target='_blank'
             rel='noopener noreferrer'>{repo.name}
        </ListGroup.Item></div>
    ))}
    </ListGroup>)}
    </div>)
     
}

export default ProfileGithub
