import React from 'react'
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom'

const Header = () => (<div>
  <Navbar expand="xl" bg="dark" variant="dark">
    <Navbar.Brand>
      <Link to='/' className='home'>
        DevConnector
      </Link>
    </Navbar.Brand>
    <Nav className="navbar">
      <Nav.Link>
          Developers
        </Nav.Link>
        <Link to='/register' className='nav-items'>
          Register
        </Link>
        <Link to='/login' className='nav-items'>
          Login
        </Link>
    </Nav>
  </Navbar>
  </div>)

export default Header
