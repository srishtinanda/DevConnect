import React, { Fragment } from 'react'
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { FaUserAlt, FaSignOutAlt } from 'react-icons/fa';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logout } from '../../../actions'

const Header = ({ auth: { isAuthenticated, loading}, logout}) => {
  const authLinks = ( <Nav className="navbar">
    <Nav.Link href='/dashboard'>
    <FaUserAlt/>
      {` Dashboard`}
    </Nav.Link>
    <Nav.Link onClick={logout} href='#!'>
    <FaSignOutAlt/>
      {` Logout`}
  </Nav.Link>
</Nav>
) 
  const guestLinks = ( <Nav className="navbar">
  <Nav.Link href='#!'>
      Developers
    </Nav.Link>
    <Link to='/register' className='nav-items'>
      Register
    </Link>
    <Link to='/login' className='nav-items'>
      Login
    </Link>
</Nav>
  )
  return (<div>
  <Navbar expand="xl" bg="dark" variant="dark">
    <Navbar.Brand>
      <Link to='/' className='home'>
        DevConnector
      </Link>
    </Navbar.Brand>
    {!loading && (<Fragment> {
      isAuthenticated ? authLinks : guestLinks
  }</Fragment>)}
  </Navbar>
  </div>)}
Header.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  auth: state.auth
})
export default connect(mapStateToProps, { logout })(Header)
