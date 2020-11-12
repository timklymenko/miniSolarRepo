// @flow
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import UserContext from '../context/UserContext'

class LessonPlan extends Component<Props, State> {
  // eslint-disable-next-line react/sort-comp
  static contextType = UserContext

  render() {
    return (
      <div>
        <h1>Hi, This is the lesson plan.</h1>
      </div>
    )
  }
}

export default withRouter(LessonPlan)
