// @flow

import React, { useState } from 'react'

import Bookings from './Bookings'

export default function BookingsWrapper(props: { userID: number }) {
  const [refresh, useRefresh] = useState(true)

  const refreshPage = () => {
    console.log('hey')
    return useRefresh(!refresh)
  }

  return (
    <Bookings
      userID={props.userID}
      refreshVariable={refresh}
      refreshPage={refreshPage}
    />
  )
}
