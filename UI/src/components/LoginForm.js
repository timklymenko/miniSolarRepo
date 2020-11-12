// @flow
import React, { Component } from 'react'
import type { History } from 'react-router-dom'
import { Form, Button } from 'semantic-ui-react'

import UserContext from '../context/UserContext'
import { type AuthUser, blankUser } from '../types'
import { capitalise } from '../utils'
import API from '../api'

type Props = {
  updateModalHeader: string => void | null,
  handleClose: () => void | null,
  history?: History,
}

type State = {
  signUp: boolean,
  errors: $ObjMap<AuthUser, (any) => boolean | string>,
  userDetails: AuthUser,
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
      signUp: false,
      errors: {
        name: false,
        email: false,
        phone: false,
        password: false,
      },
      userDetails: blankUser,
    }
  }

  handleSubmit = () => {
    const { signUp, userDetails } = this.state
    const errors = {
      name: signUp && userDetails.name === '',
      email: userDetails.email === '',
      phone: false,
      password: userDetails.password === '',
    }

    if (Object.values(errors).some(err => err)) {
      this.setState({ errors })
      return
    }

    // eslint-disable-next-line no-extra-semi
    ;(signUp ? API.signup(userDetails) : API.login(userDetails)).then(
      response => {
        const { ok, accessToken, user } = response

        if (ok) {
          this.context.dispatch({
            type: 'SET_USER',
            payload: { user, accessToken },
          })

          if (this.props.history) {
            this.props.history.push('/profile')
          }

          if (this.props.handleClose) {
            this.props.handleClose()
          }
        } else if (!signUp && response.message) {
          if (response.message.includes('Email')) {
            errors.email = response.message
          } else {
            errors.password = response.message
          }

          this.setState({ errors })
        }
      },
    )
  }

  renderField = (
    name: string,
    placeholder: string,
    required?: boolean = false,
  ) => {
    const { userDetails } = this.state
    return (
      <Form.Input
        label={capitalise(name)}
        type={name}
        name={name}
        required={required}
        placeholder={placeholder}
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
    const { signUp } = this.state
    const text = signUp ? 'Sign In' : 'Sign Up'
    const message = signUp
      ? 'Already have an account?'
      : "Dont' have an account?"
    return (
      <>
        <Form onSubmit={this.handleSubmit}>
          {signUp && this.renderField('name', 'Your Name', true)}
          {this.renderField('email', 'jane@example.com', true)}
          {signUp && this.renderField('phone', 'Your Phone Number')}
          {this.renderField('password', 'password', true)}
          <Form.Button>Submit</Form.Button>
        </Form>
        <br />
        <p>
          {message} &nbsp;&nbsp;
          <Button
            onClick={() => {
              this.setState({ signUp: !signUp })
              if (this.props.updateModalHeader) {
                this.props.updateModalHeader(text)
              }
            }}
            size="mini"
            basic
          >
            {text}
          </Button>
        </p>
      </>
    )
  }
}
