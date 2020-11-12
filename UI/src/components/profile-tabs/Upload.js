// @flow

import React, { Component, useRef } from 'react'
import { Form, Icon } from 'semantic-ui-react'

import API from '../../api'
import UserContext from '../../context/UserContext'
import { type Property } from '../../types'

function FilePicker(props: {
  error: false | string,
  handleChange: (files: File[]) => void,
}) {
  const inputRef = useRef(null)

  const transformFileList = (files: FileList) => {
    const filesList = []
    for (let i = 0; i < files.length; i += 1) filesList.push(files.item(i))
    return filesList
  }

  return (
    <div style={{ paddingTop: '23px' }}>
      <Form.Button
        type="button"
        icon="file"
        content="Upload Images"
        onClick={() => inputRef.current && inputRef.current.click()}
        error={props.error ? { content: props.error, pointing: 'left' } : false}
      />
      <input
        ref={inputRef}
        type="file"
        name="image-picker"
        // multiple
        hidden
        onChange={() =>
          inputRef.current &&
          props.handleChange(transformFileList(inputRef.current.files))
        }
      />
    </div>
  )
}

type PostcodeType = {
  key: number,
  text: string,
  value: number,
}

type SuburbType = {
  key: number,
  text: string,
  value: string,
  postcodes: PostcodeType[],
}

type Props = {}

type State = {
  loadingSuburbs: boolean,
  termsUnchecked: boolean,
  suburbs: SuburbType[],
  postcodes: PostcodeType[],
  selectedSuburb: $PropertyType<Property, 'suburb'>,
  selectedPostcode: $PropertyType<Property, 'postcode'>,
  uploadedImages: File[],
  errors: { ...$ObjMap<Property, (any) => boolean>, upload: false | string }, // stupid Flow
}

export default class Upload extends Component<Props, State> {
  // eslint-disable-next-line react/sort-comp
  static contextType = UserContext

  constructor(props: Props) {
    super(props)
    this.state = {
      loadingSuburbs: true,
      termsUnchecked: true,
      suburbs: [],
      postcodes: [],
      selectedSuburb: '',
      selectedPostcode: 0,
      uploadedImages: [],
      errors: {
        street1: false,
        suburb: false,
        state: false,
        postcode: false,
        description: false,
        guestLimit: false,
        upload: false,
      },
    }
    API.getSuburbs().then(
      ({ data: { suburbs } }) =>
        this.setState({
          loadingSuburbs: false,
          suburbs: suburbs.map((s, i) => ({
            key: i,
            text: s.name,
            value: s.name,
            postcodes: s.postcodes.map(p => ({
              key: parseInt(p, 10),
              text: p,
              value: parseInt(p, 10),
            })),
          })),
        }),
      // eslint-disable-next-line function-paren-newline
    )
  }

  handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    const street1 = e.currentTarget.elements.namedItem('street1')
    const description = e.currentTarget.elements.namedItem('description')
    const guestLimit = e.currentTarget.elements.namedItem('guestLimit')
    const propertyDetails = {
      // $flow-disable-line
      street1: street1 ? street1.value : '',
      suburb: this.state.selectedSuburb || '',
      postcode: this.state.selectedPostcode || 0,
      state: 'NSW',
      // $flow-disable-line
      description: description ? description.value : '',
      // $flow-disable-line
      guestLimit:
        guestLimit && guestLimit.value ? parseInt(guestLimit.value, 10) : 0,
    }
    const errors = {
      street1: propertyDetails.street1 === '',
      suburb: propertyDetails.suburb === '',
      postcode: propertyDetails.postcode === 0,
      state: propertyDetails.state === '',
      description: propertyDetails.description === '',
      guestLimit: propertyDetails.guestLimit === 0,
      upload:
        this.state.uploadedImages.length < 1
          ? 'Must upload at least one image'
          : false,
    }
    if (Object.values(errors).every(err => !err)) {
      console.log('Uploading:', propertyDetails)
      API.uploadProperty(
        propertyDetails,
        this.context.state.user.id,
        this.state.uploadedImages[0],
      )
    } else {
      console.log('FORM INVALID:', errors)
      this.setState({ errors })
    }
  }

  handleImageUpload = (files: File[]) => {
    const { uploadedImages, errors } = this.state
    if (files.some(file => !/^image\//.test(file.type))) {
      this.setState({
        errors: { ...errors, upload: "Can't upload files that aren't images" },
      })
    } else {
      this.setState({
        uploadedImages: [...uploadedImages, ...files],
        errors: { ...errors, upload: false },
      })
    }
  }

  renderField = (name: string) => {
    const { errors } = this.state
    const isStreet = name === 'street1'
    return (
      <Form.Input
        fluid
        label={isStreet ? 'Street' : 'Guest Limit'}
        name={name}
        placeholder={isStreet ? 'Street' : null}
        type={isStreet ? 'text' : 'number'}
        error={errors[name]}
      />
    )
  }

  renderSuburbSelection = () => {
    const {
      errors: { suburb },
      loadingSuburbs,
      suburbs,
    } = this.state
    return (
      <Form.Select
        search
        selection
        loading={loadingSuburbs}
        options={suburbs}
        label="Suburb"
        name="suburb"
        placeholder="Suburb"
        onChange={(_, { value }) => {
          const suburbItem = suburbs.find(s => s.value === value)
          this.setState({
            selectedSuburb: value,
            postcodes: suburbItem ? suburbItem.postcodes : [],
          })
        }}
        error={suburb}
      />
    )
  }

  renderPostcodeSelection = () => {
    const {
      errors: { postcode },
      postcodes,
    } = this.state
    return (
      <Form.Select
        selection
        disabled={postcodes.length === 0}
        options={postcodes}
        label="Postcode"
        name="postcode"
        placeholder={
          postcodes.length === 0 ? 'Please select a suburb first' : 'Postcode'
        }
        onChange={(_, { value }) =>
          this.setState({
            selectedPostcode: value,
          })
        }
        error={postcode}
      />
    )
  }

  render() {
    const { termsUnchecked, uploadedImages } = this.state
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group widths="equal">
          {this.renderField('street1')}
          {this.renderField('guestLimit')}
        </Form.Group>
        <Form.Group>
          {this.renderSuburbSelection()}
          {this.renderPostcodeSelection()}
          <FilePicker
            error={this.state.errors.upload}
            handleChange={this.handleImageUpload}
          />
          {uploadedImages.length > 0 && (
            <span style={{ paddingTop: '31px' }}>
              {uploadedImages.length} file uploaded
              <Icon
                link
                name="close"
                onClick={() => this.setState({ uploadedImages: [] })}
              />
            </span>
          )}
        </Form.Group>
        <Form.TextArea
          label="About"
          name="description"
          placeholder="Tell us more about your property..."
          error={this.state.errors.description}
        />
        <Form.Checkbox
          label="I agree to the Terms and Conditions"
          onChange={() => this.setState({ termsUnchecked: !termsUnchecked })}
        />
        <Form.Button disabled={termsUnchecked}>Submit</Form.Button>
      </Form>
    )
  }
}
