// @flow
import React, { useContext } from 'react'
import { useQuery } from '@apollo/react-hooks'

import UserContext from '../../context/UserContext'
import { USER_WISHLIST } from '../../api/QUERIES'
import CenterText from '../CenterText'
import Properties from '../results/Properties'

export default function Manage() {
  const { state: { accessToken } } = useContext(UserContext)
  const { data, loading, error } = useQuery(USER_WISHLIST, {
    fetchPolicy: 'cache-and-network',
    variables: {
      token: accessToken,
    },
  })

  if (error) {
    console.error(error)
    return <CenterText text="Oops, something unexpected happened" />
  }
  if (loading) {
    return <CenterText text="Loading ..." />
  }

  const { user } = data
  if (user.message) {
    console.error(user.message)
    return <CenterText text="Oops, something unexpected happened" />
  }

  return <Properties properties={user.wishlist} />
}
