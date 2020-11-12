// @flow
import React, { useState } from 'react'
import { Card, Button, Divider, Confirm } from 'semantic-ui-react'

import type { DbBooking } from '../../types'
import API from '../../api'
import PropertyModal from './PropertyModal'
import ReviewsModal from '../ReviewsModal'

type Props = {
  ...DbBooking,
  refreshPage: () => boolean,
}

export default function BookingTile(props: Props) {
  const { property, ...booking } = props
  console.log(props)
  const [deleteConfirmation, setDeleteConfirmation] = useState(false)
  const handleDelete = () => {
    API.deleteBooking(booking.id)
  }

  console.log('hey...')

  const handleClick = () => {
    setDeleteConfirmation(true)
  }

  const handleUpdateBookingStayed = () => {
    API.updateBookingStayed(booking.id)
  }

  const startDate = booking.startDate.split('T')[0]
  const endDate = booking.endDate.split('T')[0]

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{property.street1}</Card.Header>
        <Card.Meta>{property.postcode}</Card.Meta>
        <Card.Description>
          {`${property.suburb}, ${property.state} from ${startDate} to ${endDate}`}
        </Card.Description>
      </Card.Content>
      <Card.Content>
        <ReviewsModal {...property} bookingId={booking.id} />
        <Divider />
        <PropertyModal {...property} type="EDIT" booking={booking} />
        <Button color="red" onClick={handleClick}>
          Delete Booking
        </Button>
        <Divider />
        <Button color="blue" onClick={handleUpdateBookingStayed}>
          PRODUCTION ONLY: UPDATE CLIENT HAS STAYED
        </Button>
        <Divider />
        <Button color="blue" onClick={props.refreshPage}>
          REFRESH PAGE
        </Button>
        <Confirm
          open={deleteConfirmation}
          header="Confirm Details Change"
          content="Are you sure you want to change your details?"
          onCancel={() => setDeleteConfirmation(false)}
          onConfirm={() => {
            handleDelete()
            setDeleteConfirmation(false)
          }}
        />
      </Card.Content>
    </Card>
  )
}
