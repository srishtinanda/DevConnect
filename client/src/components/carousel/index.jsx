import React from 'react'
import { Jumbotron, Button, ButtonToolbar } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'

const CarouselComponent = ({ history }) => (
  <Jumbotron>
  <h1>Hello, world!</h1>
  <div>
    This is a simple hero unit, a simple jumbotron-style component for calling
    extra attention to featured content or information.
  </div>
  <div>
      <ButtonToolbar>
        <Button variant="dark" size="lg"
          onClick={() => history.push('/login')}>
          Login
        </Button>
        <Button variant="dark" size="lg"
          onClick={() => history.push('/register')}>
          Register
        </Button>
      </ButtonToolbar>
      </div>
</Jumbotron>
)
export default withRouter(CarouselComponent)
