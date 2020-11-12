// @flow
import React, { Component } from 'react'
import { Modal, Button, Menu } from 'semantic-ui-react'

import LoginForm from './LoginForm'

type Props = {
  externalControls?: {
    open: boolean,
    closeAction: () => void,
  } | null,
}

type State = {
  open: boolean,
  text: string,
}

export default class LoginModal extends Component<Props, State> {
  static defaultProps = {
    externalControls: null,
  }

  constructor(props: Props) {
    super(props)
    this.state = {
      open: false,
      text: 'Sign In',
    }
  }

  handleOpen = () => this.setState({ open: true })

  // eslint-disable-next-line no-confusing-arrow
  handleClose = () =>
    this.props.externalControls
      ? this.props.externalControls.closeAction()
      : this.setState({ open: false })

  render() {
    return (
      <Modal
        trigger={
          this.props.externalControls ? null : (
            <Menu.Item onClick={this.handleOpen}>Sign In/Sign Up</Menu.Item>
          )
        }
        onClose={this.handleClose}
        open={
          this.props.externalControls
            ? this.props.externalControls.open
            : this.state.open
        }
      >
        <Modal.Header>{this.state.text}</Modal.Header>
        <Modal.Content>
          <LoginForm
            updateModalHeader={text => this.setState({ text })}
            handleClose={this.handleClose}
          />
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
