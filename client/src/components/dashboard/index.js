import React, { useEffect, Fragment } from 'react'
import { Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { getCurrentProfile } from '../../actions'
import { Link } from 'react-router-dom'
import Spinner from '../spinner'
import { FaUserAlt } from 'react-icons/fa'
import DashboardActions from './dashboardActions'

const body = ({ user }, { profile }) => {
  console.log('for testing')
  return (
<div>
<h1> Dashboard </h1>
<FaUserAlt/>
<span> Welcome { user && user.name } </span>
{ profile !== null ?
  <DashboardActions />
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
//   const handleLogin = (e) => {
//     const userName = document.getElementById("emailId").value;
//     const password = document.getElementById("userPassword").value;
//     e.preventDefault()
//     login(userName, password)
//   }
//   if(isAuthenticated) {
//     return <Redirect to ='/dashboard'/>
//   }
console.log(profileState, 'thisisd profile')
return (
  profileState.loading &&
  profileState.profile === null ?
  <Spinner />
  : body(auth, profileState)
)}
// Dashboard.propTypes = {
//   // getCurrentProfile: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired,
//   profile: PropTypes.object.isRequired,
// }

// const mapStateToProps = state => ({
//   auth: state.auth,
//   profile: state.profile
// })

export default Dashboard
