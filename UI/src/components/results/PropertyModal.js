// @flow
import React, { Component } from 'react'
import styled from 'styled-components'
import {
  Modal,
  Button,
  Header,
  Segment,
  Icon,
  Divider,
} from 'semantic-ui-react'

import type { DbProperty, JustBooking } from '../../types'
import UserContext, { type ContextType } from '../../context/UserContext'
import API from '../../api'
import Booker from './Booker'

const StyledSegment = styled(Segment)`
  padding: 0px !important;
  margin: 0px !important;
`

type Props = {
  ...DbProperty,
  type: 'BOOK' | 'EDIT',
  booking?: JustBooking | null,
}
type State = {
  open: boolean,
  inWishlist: boolean,
}

export default class PropertyModal extends Component<Props, State> {
  static defaultProps = {
    booking: null,
  }

  // eslint-disable-next-line react/sort-comp
  static contextType = UserContext

  constructor(props: Props, context: ContextType) {
    super(props, context)
    this.state = {
      open: false,
      inWishlist: false,
    }
    if (context.state.accessToken && this.props.type === 'BOOK') {
      API.getWishlist(context.state.accessToken).then(
        wishlist =>
          this.setState({
            inWishlist: !!wishlist.find(p => p.id === props.id),
          }),
        // eslint-disable-next-line function-paren-newline
      )
    }
  }

  handleOpen = () => this.setState({ open: true })

  handleClose = () => this.setState({ open: false })

  handleWishlistAction = () => {
    const { inWishlist } = this.state
    const {
      state: { user },
    } = this.context
    this.setState({
      inWishlist: !inWishlist,
    })
    if (inWishlist) {
      API.removeFavourite(user.id, this.props.id)
    } else {
      API.addFavourite(user.id, this.props.id)
    }
  }

  renderWishlistAction = () => (
    <StyledSegment floated="right" basic>
      <Icon
        link
        size="big"
        name={this.state.inWishlist ? 'heart' : 'heart outline'}
        onClick={this.handleWishlistAction}
      />
    </StyledSegment>
  )

  render() {
    const {
      type,
      id,
      street1,
      suburb,
      postcode,
      state,
      description,
      guestLimit,
      booking,
    } = this.props
    return (
      <Modal
        trigger={
          // eslint-disable-next-line react/jsx-wrap-multilines
          <Button onClick={this.handleOpen}>
            {type === 'EDIT' ? 'Edit' : 'More'}
          </Button>
        }
        onClose={this.handleClose}
        open={this.state.open}
      >
        <Modal.Header>
          {street1}
          {this.context.state.user &&
            type === 'BOOK' &&
            this.renderWishlistAction()}
        </Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Header>{`${suburb}, ${postcode}, ${state}`}</Header>
            <p>{description}</p>
            <p>Guest Limit: {guestLimit}</p>
          </Modal.Description>
          <Divider />
          <Booker propertyId={id} edit={type === 'EDIT'} booking={booking} />
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
