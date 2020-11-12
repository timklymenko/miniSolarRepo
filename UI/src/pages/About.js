// @flow
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import UserContext from '../context/UserContext'

class About extends Component<Props, State> {
  // eslint-disable-next-line react/sort-comp
  static contextType = UserContext

  render() {
    return (
      <div>
        <h1>Hi, about the project...</h1>
      </div>
    )
  }
}

export default withRouter(About)
