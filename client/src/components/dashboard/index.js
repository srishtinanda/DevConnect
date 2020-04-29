import React, { useEffect, Fragment } from 'react'
import { Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { getCurrentProfile } from '../../actions'
import { Link } from 'react-router-dom'
import { FaUserAlt, FaUserMinus } from 'react-icons/fa'
import DashboardActions from './dashboardActions'
import Spinner from '../spinner'
import Experience from './experience';
import Education from './education';
import { deleteAccount } from '../../actions';

const body = ({ user }, { profile }, dispatch) => {
  console.log('for testing', profile?.education, profile?.experience)
  return (
<div>
<h1> Dashboard </h1>
<FaUserAlt/>
<span> Welcome { user && user.name } </span>
{ profile !== null ?
  <>
    <DashboardActions />
    <Experience experience={profile.experience} />
    <Education education={profile.education} />
    <Button variant="danger"
      onClick={()=> dispatch(deleteAccount())}
    ><FaUserMinus/>Delete My Account</Button>
  </>
  : <Fragment>
    <div>You have not yet setup a profile,
    please add some info</div>
    <Button variant="outline-primary" size="lg">
      <Link to ='/create-profile'>Create Profile </Link>
    </Button>
    </Fragment> }
</div>
)}
const Dashboard = () => {
    const auth = useSelector(state => state.auth)
    const profileState = useSelector(state => state.profile)
    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(getCurrentProfile())
    }, [dispatch, auth])
console.log(profileState, 'thisisd profile')
return (
  profileState.loading &&
  profileState.profile === null ?
  <Spinner />
  : body(auth, profileState, dispatch)
)}

export default Dashboard
