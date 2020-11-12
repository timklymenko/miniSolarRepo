// @flow
import React, { Component } from 'react'
// import styled from 'styled-components'
import {
  Modal,
  Button,
  Form,
} from 'semantic-ui-react'

import type { DbProperty } from '../types'
import UserContext from '../context/UserContext'
import API from '../api'

type State = {
  open: boolean,
  guestLimit: number,
  description: string,
  errors: {
    guestLimit: string | false,
    description: string | false,
  },
}

export default class PropertyModal extends Component<DbProperty, State> {
  // eslint-disable-next-line react/sort-comp
  static contextType = UserContext

  constructor(props: DbProperty) {
    super(props)
    this.state = {
      open: false,
      guestLimit: props.guestLimit,
      description: props.description,
      errors: {
        guestLimit: false,
        description: false,
      },
    }
  }

  handleOpen = () => this.setState({ open: true })

  handleClose = () => this.setState({ open: false })

  handleSubmit = () => {
    const { guestLimit, description } = this.state
    const errors = {
      // eslint-disable-next-line no-restricted-globals
      guestLimit: !guestLimit || isNaN(guestLimit) || guestLimit <= 0
        ? 'Guest Limit needs to be a positive number'
        : false,
      description: description === '' ? 'Description can\'t be empty' : false,
    }
    console.log(errors)
    if (Object.values(errors).every(err => !err)) {
      API.editProperty(this.props.id, guestLimit, description)
        .then(({ ok }) => console.log(ok))
    }
    this.setState({ errors })
  }

  render() {
    const { description, guestLimit } = this.props
    return (
      <Modal
        trigger={<Button onClick={this.handleOpen}>Edit</Button>}
        onClose={this.handleClose}
        open={this.state.open}
      >
        <Modal.Header>
          Edit Your Listing
        </Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Group>
              <Form.Input
                label="Guest Limit"
                name="guestLimit"
                type="number"
                defaultValue={guestLimit}
                onChange={(_, { value }) => this.setState({ guestLimit: value })}
                error={this.state.errors.guestLimit}
              />
            </Form.Group>
            <Form.TextArea
              label="About"
              name="description"
              defaultValue={description}
              onChange={(_, { value }) => this.setState({ description: value })}
              error={this.state.errors.description}
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.handleClose}>Cancel</Button>
          <Button color="green" onClick={this.handleSubmit}>Change</Button>
        </Modal.Actions>
      </Modal>
    )
  }
}
