// @flow
import React, { Component } from 'react'
import type { History } from 'react-router-dom'
import { Form, Confirm } from 'semantic-ui-react'

import UserContext from '../../context/UserContext'
import { type AuthUser, blankUser } from '../../types'
import { capitalise } from '../../utils'
import API from '../../api'

type Props = {
  history?: History,
}

type State = {
  errors: $ObjMap<AuthUser, (any) => boolean | string>,
  userDetails: AuthUser,
  changeDetails: boolean,
}

export default class LoginForm extends Component<Props, State> {
  static defaultProps = {
    history: null,
  }

  // eslint-disable-next-line react/sort-comp
  static contextType = UserContext

  constructor(props: Props) {
    super(props)
    this.state = {
      errors: {
        name: false,
        email: false,
        phone: false,
        password: false,
      },
      userDetails: blankUser,
      changeDetails: false,
    }
  }

  handleConfirm = () => {
    this.setState({ changeDetails: true })
  }

  handleSubmit = () => {
    console.log('here')
    API.changeDetails(
      this.context.state.user.id,
      this.state.userDetails.name || this.context.state.user.name,
      this.state.userDetails.phone || this.context.state.user.phone,
      this.state.userDetails.password || this.context.state.user.password,
    ).then(response => {
      const { ok, user } = response
      const token = this.context.state.accessToken
      console.log(user)
      if (ok) {
        this.context.dispatch({
          type: 'SET_USER',
          payload: { user, token },
        })

        if (this.props.history) {
          this.props.history.push('/profile')
        }

        // if (this.props.handleClose) {
        //   this.props.handleClose()
        // }
      }
    })
  }

  renderField = (name: string, placeholder: string) => {
    const { userDetails } = this.state
    return (
      <Form.Input
        label={capitalise(name)}
        type={name}
        name={name}
        placeholder={placeholder}
        readOnly={name === '_email'}
        onChange={({ currentTarget: { value } }) =>
          this.setState({
            userDetails: {
              ...userDetails,
              [name]: value,
            },
          })
        }
        error={this.state.errors[name]}
      />
    )
  }

  render() {
    // console.log(this.context.state.user)
    return (
      <>
        <h3>Update Your Details</h3>
        <Form onSubmit={this.handleConfirm}>
          {this.renderField('name', this.context.state.user.name)}
          {this.renderField('Email', this.context.state.user.email)}
          {this.renderField('phone', this.context.state.user.phone)}
          {this.renderField('Password', 'password')}
          <Form.Button>Update Details</Form.Button>
        </Form>
        <Confirm
          open={this.state.changeDetails}
          header="Confirm Details Change"
          content="Are you sure you want to change your details?"
          onCancel={() => this.setState({ changeDetails: false })}
          onConfirm={() => {
            this.handleSubmit()
            this.setState({ changeDetails: false })
          }}
        />
      </>
    )
  }
}
