import React, { Component } from 'react'
import CorouselComponent from '../../carousel'

class  Landing extends Component {
render() {
  return (
    <div className='landing'>
      <CorouselComponent history={this.props.history}/>
    </div>
  )
}
}

export default Landing
