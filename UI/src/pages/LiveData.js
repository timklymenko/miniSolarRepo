// @flow
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import Table from '../components/Table'

class LiveData extends Component<Props, State> {
  // eslint-disable-next-line react/sort-comp
  // static contextType = UserContext
  constructor(props: Props) {
    super(props)
    this.state = {
      data: [['', '', '']],
    }
  }

  fetchData(that) {
    const url = 'http://localhost:3001/data'
    fetch(url)
      .then((response) => response.json())
      .then((contents) => {
        that.setState({ data: contents })
      })
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.fetchData(this)
    }, 3000)
  }

  render() {
    return (
      <div>
        <h1>Live Data Feed</h1>
        <Table props={this.state.data} />
      </div>
    )
  }
}

export default withRouter(LiveData)
