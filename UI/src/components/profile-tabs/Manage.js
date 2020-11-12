// @flow
import React, { useContext, type Node } from 'react'
import { useQuery } from '@apollo/react-hooks'

import UserContext from '../../context/UserContext'
import type { PropertyList } from '../../types'
import { USER_PROPERTIES } from '../../api/QUERIES'
import CenterText from '../CenterText'
import ManageTile from '../tiles/ManageTile'

export default function Manage() {
  const renderProperties = (properties: PropertyList): Node =>
    properties.map(prop => <ManageTile key={prop.id} {...prop} />)

  const {
    state: { accessToken },
  } = useContext(UserContext)
  const { data, loading, error } = useQuery(USER_PROPERTIES, {
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

  return <>{renderProperties(user.properties)}</>
}
