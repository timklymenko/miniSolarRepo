/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// @flow
import { Menu } from 'semantic-ui-react'
import { Link, NavLink } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import React, { Component } from 'react'
import leaderboard from '../assets/Leaderboard.png'
import lessonPlan from '../assets/Lesson_Plan.png'
import about from '../assets/About.png'

function LinkItem({ header, link, children }: LinkProps) {
  return (
    <Menu.Item header={header} as={header ? Link : NavLink} to={link}>
      {children}
    </Menu.Item>
  )
}

class Home extends Component {
  render() {
    return (
      // <div style={{background-color: "lightblue"}}>
      <div>
        <LinkItem header link="/lesson-plan">
          <img src={lessonPlan} alt="Lesson Plan" width="200" height="200" />
        </LinkItem>
        <LinkItem header link="/battery-leaderboard">
          <img
            src={leaderboard}
            alt="Battery Leaderboard"
            width="200"
            height="200"
          />
        </LinkItem>
        <LinkItem header link="/about">
          <img src={about} alt="About" width="200" height="200" />
        </LinkItem>
      </div>
    )
  }
}

export default withRouter(Home)
