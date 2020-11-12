// @flow
import React, { Component } from 'react'
import {
  Modal,
  Button,
  Header,
  Divider,
  Form,
  Rating,
  Icon,
} from 'semantic-ui-react'

import API from '../api'
import type { DbProperty } from '../types'

type Props = {
  ...DbProperty,
  bookingId: number,
}

type State = {
  open: boolean,
  newReview: string,
  newRating: number,
  reviewsData: {
    review: string,
    id: number,
    rating: number,
    hasStayed: boolean,
  }[],
}

export default class ReviewsModal extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      open: false,
      reviewsData: [],
      newReview: '',
      newRating: 0,
    }

    API.getReviews(this.props.id).then(({ data: { propBookings } }) => {
      this.setState({
        reviewsData: propBookings.map(item => ({
          review: item.review,
          id: item.id,
          rating: item.rating,
        })),
      })
      // console.log(this.state.reviewsData)
    })
  }

  handleRate = ({ rating }) => {
    this.setState({ newRating: rating })
  }

  handleOpen = () => this.setState({ open: true })

  handleClose = () => this.setState({ open: false })

  handleSubmit = () => {
    API.updateBookingReview(
      this.props.bookingId,
      this.state.newReview,
      this.state.newRating,
    ).then(({ ok }) => {
      if (ok) {
        console.log('Review Added')
        //   // TODO: redirect to bookings tab
        //   this.props.history.push('/profile')
        // } else {
        //   this.setState({ error: true })
      } else {
        console.log('You have not stayed here yet')
      }
    })
  }

  handleChange = (event: SyntheticEvent<HTMLTextAreaElement>) => {
    this.setState({ newReview: event.currentTarget.value })
  }

  Rating = (disabled: boolean, defaultRating: number) => (
    <Rating
      maxRating={5}
      clearable
      onRate={this.handleRate}
      disabled={disabled}
      defaultRating={defaultRating}
    />
  )

  getForm = () => (
    <Form onSubmit={this.handleSubmit}>
      <Form.TextArea
        onChange={this.handleChange}
        placeholder="Tell us more about your stay here..."
      />
      {this.Rating(false, this.state.newRating)}
      <Form.Button>Add review</Form.Button>
    </Form>
  )

  getAverageRating = () => {
    // eslint-disable-next-line prefer-destructuring
    const length = this.state.reviewsData.filter(item => item.review !== null)
      .length

    if (!length) return 0

    let av = this.state.reviewsData
      .map(item => item.rating)
      .reduce((acc, c) => acc + c, 0)

    // eslint-disable-next-line operator-assignment
    av = av / length
    if (av % 1 === 0) {
      av = av.toFixed(0)
    } else if (av % 1.1 === 0) {
      av = av.toFixed(1)
    } else {
      av = av.toFixed(2)
    }
    return av.toString()
  }

  getReviews = () =>
    this.state.reviewsData
      .filter(item => item.review !== null && item.review !== '')
      .map(item => (
        <div key={item.id}>
          <Divider />
          {this.Rating(true, item.rating)}
          <p key={item.id}>{item.review}</p>
        </div>
      ))

  // checkCanReview = () => {
  //   return true
  //   // const entry = this.state.reviewsData.filter(
  //   //   item => item.id === this.props.bookingId,
  //   // )
  //   // console.log(entry)
  //   // if (entry.length !== 0) {
  //   //   return entry[0].review !== null
  //   // }
  //   // return false
  // }

  getAmountOfReviews = () =>
    this.state.reviewsData.filter(item => item.review !== null).length

  render() {
    return (
      <Modal
        trigger={<Button onClick={this.handleOpen}>Reviews</Button>}
        onClose={this.handleClose}
        open={this.state.open}
      >
        <Modal.Header>Leave a Review</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Header>{`${this.props.street1}, ${this.props.suburb}, ${this.props.postcode}, ${this.props.state}`}</Header>
          </Modal.Description>
          <Divider />
          {/* {this.checkCanReview() && this.getForm()} */}
          {this.getForm()}
          <Divider />
          <div>
            <h3>Reviews</h3>
          </div>
          <div>
            <Icon name="star" />
            <tt>{this.getAverageRating()}</tt>
          </div>
          <div>
            <tt>{this.getAmountOfReviews()}</tt>
            <tt>{this.getAmountOfReviews() === 1 ? ' Review' : ' Reviews'}</tt>
          </div>
          {this.getReviews()}
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" onClick={this.handleClose}>
            Close
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}
