/* eslint-disable react/no-unused-state */
// @flow
import React, { useReducer, type Node } from 'react'

import type { User } from '../types'

type ContextState = {|
  user: User | null,
  accessToken: string | null,
|}

type Action =
  | { type: 'SET_USER', payload: { user: User, accessToken: string } }
  | { type: 'CLEAR_USER' }

export type ContextType = {
  state: ContextState,
  dispatch: (action: Action) => void,
}

const emptyState = {
  user: null,
  accessToken: null,
}

function reducer(state: ContextState, action: Action) {
  switch (action.type) {
    case 'SET_USER': {
      const { user, accessToken } = action.payload
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('token', accessToken)
      return {
        user,
        accessToken,
      }
    }
    case 'CLEAR_USER': {
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      return emptyState
    }
    default:
      return state
  }
}

const UserContext = React.createContext<ContextType>({})

function UserProvider(props: { children: Node }) {
  const userItem = localStorage.getItem('user')
  const tokenItem = localStorage.getItem('token')

  const initialState = {
    user: userItem ? JSON.parse(userItem) : null,
    accessToken: tokenItem || null,
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {props.children}
    </UserContext.Provider>
  )
}

const UserConsumer = UserContext.Consumer

export { UserContext as default, UserProvider, UserConsumer }
