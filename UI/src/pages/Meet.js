// @flow
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Link, NavLink } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

function LinkItem({ header, link, children }: LinkProps) {
  return (
    <Menu.Item header={header} as={header ? Link : NavLink} to={link}>
      {children}
    </Menu.Item>
  )
}

class Meet extends Component<Props, State> {
  render() {
    return (
      <div>
        <h1>Meet the Team</h1>
        <LinkItem header link="/lesson-plan">
          <p>[Photo of the Team]</p>
        </LinkItem>
      </div>
    )
  }
}

export default withRouter(Meet)
