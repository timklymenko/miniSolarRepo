// @flow
import React, { Component } from 'react'
import { withRouter, type History } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import styled from 'styled-components'
import {
  Form,
  Header,
  Grid,
  Message,
  Confirm,
} from 'semantic-ui-react'
import DayPicker, { DateUtils } from 'react-day-picker'

import UserContext from '../../context/UserContext'
import type { DateRange, JustBooking } from '../../types'
import API from '../../api'
import { BOOKINGS_BY_PROPERTY } from '../../api/QUERIES'
import LoginModal from '../LoginModal'

const PaddedHeader = styled(Header)`
  padding-top: 10px;
`

type DayPickerProps = {
  propertyId: number,
  bookingId: number,
  edit: boolean,
  selection: DateRange,
  updateSelection: (range: DateRange) => void,
}

function DayPickerWithBookings(props: DayPickerProps) {
  const {
    propertyId,
    bookingId,
    edit,
    selection,
  } = props
  const rangeModifiers = {
    start: selection.from,
    end: selection.to,
  }

  const defaultProps = {
    numberOfMonths: 2,
    selectedDays: [selection.from, selection],
    modifiers: rangeModifiers,
  }

  const { loading, data } = useQuery(BOOKINGS_BY_PROPERTY, {
    variables: { propId: propertyId },
  })

  if (loading) {
    return <DayPicker {...defaultProps} className="iteractionDisabled" />
  }

  let booked = data.propBookings
  if (edit) {
    booked = booked.filter(({ id }) => id !== bookingId)
  }

  booked = booked.map(({ startDate, endDate }) => ({
    from: new Date(Date.parse(startDate)),
    to: new Date(Date.parse(endDate)),
  }))

  const rangeBooked = (range: DateRange) => {
    if (!range.to || !range.from) return false
    // eslint-disable-next-line no-restricted-syntax
    for (const booking of booked) {
      if (
        DateUtils.isDayInRange(booking.from, range) ||
        DateUtils.isDayInRange(booking.to, range) ||
        DateUtils.isDayInRange(range.from, booking) ||
        DateUtils.isDayInRange(range.to, booking)
      ) {
        return true
      }
    }
    return false
  }

  const handleDayClick = (day: Date, modifiers: { disabled: boolean }) => {
    if (modifiers.disabled) return
    const range = DateUtils.addDayToRange(day, selection)
    if (!rangeBooked(range)) props.updateSelection(range)
  }

  return (
    <DayPicker
      {...defaultProps}
      className="Selectable"
      disabledDays={[{ before: new Date() }, ...booked]}
      onDayClick={handleDayClick}
    />
  )
}

type Props = {
  propertyId: number,
  history: History,
  edit: boolean,
  booking: JustBooking | null,
}

type State = {
  selection: DateRange,
  error: boolean,
  userNotification: boolean,
  bookingConfirmation: boolean,
  showLoginModal: boolean,
}

class Booker extends Component<Props, State> {
  // eslint-disable-next-line react/sort-comp
  static contextType = UserContext

  constructor(props: Props) {
    super(props)
    this.state = {
      selection: {
        from: props.booking ? new Date(Date.parse(props.booking.startDate)) : undefined,
        to: props.booking ? new Date(Date.parse(props.booking.endDate)) : undefined,
      },
      error: false,
      userNotification: false,
      bookingConfirmation: false,
      showLoginModal: false,
    }
  }

  handleSubmit = () => {
    if (!this.context.state.user) {
      this.setState({ userNotification: true })
    } else {
      this.setState({ bookingConfirmation: true })
    }
  }

  handleBooking = () => {
    const {
      selection: { from, to },
    } = this.state
    if (from && to && this.props.propertyId) {
      if (this.props.edit && this.props.booking) {
        API.editBooking({
          bookingId: this.props.booking.id,
          from,
          to,
        }).then(({ ok }) => {
          if (ok) {
            console.log('Booking successfully edited')
            // TODO: redirect to bookings tab
            this.props.history.push('/profile')
          } else {
            this.setState({ error: true })
          }
        })
      } else {
        API.bookProperty({
          propertyId: this.props.propertyId,
          userId: this.context.state.user.id,
          from,
          to,
        }).then(({ ok }) => {
          if (ok) {
            console.log('Booking successful')
            // TODO: redirect to bookings tab
            this.props.history.push('/profile')
          } else {
            this.setState({ error: true })
          }
        })
      }
    }
    this.setState({ bookingConfirmation: false })
  }

  render() {
    const {
      selection,
      error,
      userNotification,
      bookingConfirmation,
      showLoginModal,
    } = this.state
    const fromString = selection.from ? selection.from.toDateString() : ''
    const toString = selection.to ? selection.to.toDateString() : ''
    return (
      <Grid>
        <PaddedHeader as="h3">Request to stay here:</PaddedHeader>
        <Grid.Row columns={2}>
          <Grid.Column width={10}>
            <DayPickerWithBookings
              propertyId={this.props.propertyId}
              bookingId={this.props.booking ? this.props.booking.id : 0}
              edit={this.props.edit}
              selection={selection}
              updateSelection={newSelection =>
                this.setState({ selection: newSelection })
              }
            />
          </Grid.Column>
          <Grid.Column width={5}>
            <Form onSubmit={this.handleSubmit}>
              <Form.Input label="Number of guests" type="number" />
              {error && (
                <Message
                  color="red"
                  header="Booking unavailable"
                  content="Sorry but this booking was taken while you were taking your sweet time (please reload)"
                />
              )}
              <Form.Button>
                {this.props.edit ? 'Change Booking' : 'Book'}
              </Form.Button>
            </Form>
          </Grid.Column>
        </Grid.Row>
        <Confirm
          open={userNotification}
          content="You need to sign in to be able to book properties"
          onCancel={() => this.setState({ userNotification: false })}
          onConfirm={() =>
            this.setState({
              userNotification: false,
              showLoginModal: true,
            })
          }
        />
        <Confirm
          open={bookingConfirmation}
          header="Confirm Booking"
          content={`Please confirm your booking from ${fromString} to ${toString}`}
          onCancel={() => this.setState({ userNotification: false })}
          onConfirm={this.handleBooking}
        />
        <LoginModal
          externalControls={{
            open: showLoginModal,
            closeAction: () => this.setState({ showLoginModal: false }),
          }}
        />
      </Grid>
    )
  }
}

export default withRouter(Booker)
