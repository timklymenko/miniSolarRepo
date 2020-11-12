// @flow
import React, { useContext, type Node } from 'react'
import { Link, NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { Menu } from 'semantic-ui-react'

import UserContext from '../context/UserContext'
import LoginModal from './LoginModal'
import API from '../api'

const StyledMenu = styled(Menu)`
  font-size: 1.4em !important;
`

type LinkProps = {
  header?: boolean,
  link: string,
  children: Node,
}

function LinkItem({ header, link, children }: LinkProps) {
  return (
    <Menu.Item header={header} as={header ? Link : NavLink} to={link}>
      {children}
    </Menu.Item>
  )
}

LinkItem.defaultProps = {
  header: false,
}

export default function NavBar() {
  // const {
  //   state: { user, accessToken },
  //   dispatch,
  // } = useContext(UserContext)

  // const handleClick = () => {
  //   if (accessToken) {
  //     dispatch({ type: 'CLEAR_USER' })
  //     API.logout(accessToken)
  //   }
  // }

  return (
    <StyledMenu fixed="top" size="large">
      <LinkItem header link="/">
        Home
      </LinkItem>
      <Menu.Menu position="right">
        {/* <LinkItem link="/meet">Meet Team Epsilon</LinkItem> */}

        {/* {user ? (
          <>
            <LinkItem link="/profile">Profile</LinkItem>
            <Menu.Item onClick={handleClick}>Log Out</Menu.Item>
          </>
        ) : (
          <LoginModal />
        )} */}
      </Menu.Menu>
    </StyledMenu>
  )
}
