// @flow
import React, { type Node } from 'react'
import { useQuery } from '@apollo/react-hooks'

import { BOOKINGS } from '../../api/QUERIES'
import CenterText from '../CenterText'
import BookingTile from '../tiles/BookingTile'
import type { BookingsList } from '../../types'

export default function Bookings(props: {
  userID: number,
  refreshPage: () => boolean,
  refreshVariable: boolean,
}) {
  console.log('heyyyy')
  // console.log(props.refreshVariable)
  // const refresh = () => {
  //   forceUpdate()
  // }

  const renderProperties = (userBookings: BookingsList): Node =>
    userBookings.map(booking => (
      <BookingTile
        key={booking.id}
        {...booking}
        refreshPage={props.refreshPage}
      />
    ))

  const { loading, error, data } = useQuery(BOOKINGS, {
    options: { fetchPolicy: 'cache-and-network' },
    variables: {
      id: props.userID,
    },
  })
  if (loading) {
    return <CenterText text="Loading ..." />
  }
  if (error) {
    console.error(error)
    return <CenterText text="Oops, something unexpected happened" />
  }
  return <>{renderProperties(data.userBookings)}</>
}
