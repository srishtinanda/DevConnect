import React, { Fragment, useEffect } from 'react'
import Spinner from '../spinner'
import { getAllProfiles } from '../../actions'
import { useSelector, useDispatch } from 'react-redux'
import { FaConnectdevelop } from 'react-icons/fa'
import ProfileItem from './ProfileItem'

const Profiles = () => {
  const dispatch = useDispatch()
  const {profiles, loading } = useSelector(state => state.profile)
  useEffect(() => {
    dispatch(getAllProfiles())
  }, [dispatch])
    return (<>
      {loading ? <Spinner /> :
    <Fragment> 
      <h2>Developers</h2>
      <FaConnectdevelop />
      <span className='profile-list-heading'>
        Browse and connect with developers
      </span>
      {profiles?.length > 0 ?
      <>{profiles.map((profileData) => (<ProfileItem key={profileData._id} profile={profileData}/>)
      )}</>
      : <>No Profiles Found ...</>}
    </Fragment>}
    </>)
}

export default Profiles
