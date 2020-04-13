import React from 'react'
import CorouselComponent from '../../carousel'
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

const  Landing = ({ history }) => {
 const auth = useSelector(state => state.auth.isAuthenticated)
 console.log(auth) 
 if (auth) {
   return  <Redirect to ='/dashboard' />
  }
  return (
    <div className='landing'>
      <CorouselComponent history={history}/>
    </div>
  )
}

export default Landing
