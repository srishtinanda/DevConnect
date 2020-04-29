import React, { Fragment, useEffect } from 'react'
import Spinner from '../spinner'
import { getAllProfiles, getProfileById } from '../../actions'
import { Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { FaConnectdevelop } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';

const Profile = ({ match }) => {
  const dispatch = useDispatch()
  const profile = useSelector(state => state.profile)
  const auth = useSelector(state => state.auth)
  useEffect(() => {
    dispatch(getProfileById(match.params.id))
  }, [getProfileById, match.params.id])
  console.log(auth, 'after auth is profile', profile)
    return (<>
      {profile.profile === null || profile.loading ? <Spinner /> :
    <Fragment> 
      <Link to={`/profiles`}>
      <Button variant="outline-info" >Back To Profiles
      </Button>
      </Link>
      {auth.isAuthenticated 
        && auth.loading
        === false
        && auth.user._id
        === profile.profile.user._id
        && (<Link to={`/edit-profile`}>
      <Button variant="outline-info" >Edit Profile
      </Button>
        </Link>)}
      <ProfileTop profile={profile.profile}/>
      <ProfileAbout profile={profile.profile}/>
    </Fragment>}
    </>)
}

export default Profile
