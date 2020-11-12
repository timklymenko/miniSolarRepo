// @flow
import React, { Component } from 'react'
import { Progress } from 'semantic-ui-react'

import UserContext from '../context/UserContext'

class LiveBoard extends Component<Props, State> {
  // eslint-disable-next-line react/sort-comp
  static contextType = UserContext

  render() {
    console.log(this.props.current, this.props.voltage)
    // const value = Math.ceil(this.props.current * this.props.voltage * 100) / 100
    const value = Math.ceil(this.props.current * 100) / 100
    return (
      <div>
        <Progress
          progress="value"
          value={value}
          total={5}
          color="yellow"
          label="Solar Team Charging Rate (mW)"
          active
          size="big"
        />
        <Progress
          progress="value"
          value={value}
          total={5}
          color="green"
          label="Wind Team Charging Rate (mW)"
          active
          size="big"
        />
        <Progress
          progress="value"
          value={value}
          total={5}
          color="blue"
          label="Hydro Team Charging Rate (mW)"
          active
          size="big"
        />
      </div>
    )
  }
}

export default LiveBoard
