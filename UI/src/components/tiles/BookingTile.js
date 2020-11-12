// @flow
import React from 'react'
import { Card, Item, Button } from 'semantic-ui-react'

import type { DbBooking } from '../../types'
import API from '../../api'
import Image from '../results/Image'
import PropertyModal from '../results/PropertyModal'
import ReviewsModal from '../ReviewsModal'
import { TileContent, TextContent, ButtonContent } from './TileContent'

type Props = {
  ...DbBooking,
}

export default function BookingTile(props: Props) {
  const { property, ...booking } = props

  const handleClick = () => {
    API.deleteBooking(booking.id)
  }

  const startDate = booking.startDate.split('T')[0]
  const endDate = booking.endDate.split('T')[0]

  return (
    <Card fluid>
      <TileContent>
        <Item>
          <Image propId={property.id} />
          <TextContent>
            <Item.Header>{property.street1}</Item.Header>
            <Item.Meta>{property.postcode}</Item.Meta>
            <Item.Description>
              {`${property.suburb}, ${property.state} from ${startDate} to ${endDate}`}
            </Item.Description>
          </TextContent>
          <ButtonContent>
            <ReviewsModal {...property} bookingId={booking.id} />
            <PropertyModal {...property} type="EDIT" booking={booking} />
            <Button color="red" onClick={handleClick}>
              Delete Booking
            </Button>
          </ButtonContent>
        </Item>
      </TileContent>
    </Card>
  )
}
