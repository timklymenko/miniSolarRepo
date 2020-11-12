// @flow
import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from '@apollo/react-hooks'
import './static/daypicker.css'

import API from './api'
import { UserProvider } from './context/UserContext'
import App from './App'

const container = document.getElementById('container')
if (container) {
  ReactDOM.render(
    <ApolloProvider client={API.client}>
      <UserProvider>
        <App />
      </UserProvider>
    </ApolloProvider>,
    container,
  )
}
