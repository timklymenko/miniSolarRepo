/* eslint-disable import/prefer-default-export */
// @flow
import gql from 'graphql-tag'

export const SUBURBS = gql`
  {
    suburbs {
      name
      postcodes
    }
  }
`

export const PROPERTIES = gql`
  query properties($suburb: String!) {
    properties(suburb: $suburb) {
      id
      street1
      street2
      suburb
      state
      postcode
      description
      guestLimit
    }
  }
`

export const UPLOAD_PROPERTY = gql`
  mutation createProperty(
    $street1: String!
    $suburb: String!
    $state: String!
    $postcode: Int!
    $description: String!
    $userId: Int!
    $guestLimit: Int!
  ) {
    createProperty(
      street1: $street1
      suburb: $suburb
      state: $state
      postcode: $postcode
      description: $description
      ownerId: $userId
      guestLimit: $guestLimit
    ) {
      property {
        id
      }
      ok
    }
  }
`

export const UPLOAD_IMAGE = gql`
  mutation uploadImg($fileIn: Upload!, $propId: Int!, $name: String!) {
    uploadImg(fileIn: $fileIn, propId: $propId, name: $name) {
      ok
    }
  }
`

export const DELETE_PROPERTY = gql`
  mutation deleteProperty($propId: Int!) {
    deleteProperty(id: $propId) {
      ok
    }
  }
`

export const EDIT_PROPERTY = gql`
  mutation updateProperty($id: Int!, $guestLimit: Int!, $description: String!) {
    updateProperty(
      id: $id
      newGuestLimit: $guestLimit
      newDescription: $description
    ) {
      ok
    }
  }
`

export const ADD_FAVOURITE = gql`
  mutation addFavourite($userId: Int!, $propId: Int!) {
    addFavourite(userId: $userId, propId: $propId) {
      ok
    }
  }
`

export const REMOVE_FAVOURITE = gql`
  mutation removeFavourite($userId: Int!, $propId: Int!) {
    removeFavourite(userId: $userId, propId: $propId) {
      ok
    }
  }
`

export const REVIEWS = gql`
  query propBookings($id: Int!) {
    propBookings(propId: $id) {
      review
      id
      rating
      hasStayed
    }
  }
`

export const BOOK_PROPERTY = gql`
  mutation createBooking(
    $userId: Int!
    $propId: Int!
    $startDate: DateTime!
    $endDate: DateTime!
  ) {
    createBooking(
      userId: $userId
      propId: $propId
      startDate: $startDate
      endDate: $endDate
    ) {
      ok
    }
  }
`

export const DELETE_BOOKING = gql`
  mutation deleteBooking($bookingId: Int!) {
    deleteBooking(bookingId: $bookingId) {
      ok
    }
  }
`

export const EDIT_BOOKING = gql`
  mutation editBooking(
    $bookingId: Int!
    $startDate: DateTime!
    $endDate: DateTime!
  ) {
    editBooking(
      bookingId: $bookingId
      startDate: $startDate
      endDate: $endDate
    ) {
      ok
    }
  }
`

export const BOOKINGS = gql`
  query userBookings($id: Int!) {
    userBookings(userId: $id) {
      property {
        id
        street1
        suburb
        state
        postcode
        description
        guestLimit
      }
      startDate
      endDate
      id
    }
  }
`

export const BOOKINGS_BY_PROPERTY = gql`
  query propBookings($propId: Int!) {
    propBookings(propId: $propId) {
      id
      startDate
      endDate
    }
  }
`

export const ADD_REVIEW = gql`
  mutation updateBookingReview(
    $bookingId: Int!
    $review: String!
    $rating: Int!
  ) {
    updateBookingReview(
      bookingId: $bookingId
      review: $review
      rating: $rating
    ) {
      ok
    }
  }
`

export const HAS_STAYED = gql`
  mutation updateBookingStayed($bookingId: Int!) {
    updateBookingStayed(bookingId: $bookingId) {
      ok
    }
  }
`

export const LOGIN = gql`
  mutation auth($email: String!, $password: String!) {
    auth(email: $email, password: $password) {
      ok
      accessToken
      user {
        id
        name
        email
        phone
      }
      message
    }
  }
`

export const LOGOUT = gql`
  mutation logout($token: String!) {
    logout(token: $token) {
      result {
        message
      }
    }
  }
`

export const SIGNUP = gql`
  mutation createUser(
    $name: String!
    $email: String!
    $password: String!
    $phone: String!
  ) {
    createUser(name: $name, email: $email, password: $password, phone: $phone) {
      ok
      accessToken
      user {
        id
        name
        email
        phone
      }
    }
  }
`

export const CHANGE_DETAILS = gql`
  mutation updateUser($id: Int!, $newName: String!, $newPhone: String!) {
    updateUser(id: $id, newName: $newName, newPhone: $newPhone) {
      ok
      user {
        id
        name
        email
        phone
      }
    }
  }
`

export const CHANGE_DETAILS_PASSWORD = gql`
  mutation updateUser(
    $id: Int!
    $newName: String!
    $password: String!
    $newPhone: String!
  ) {
    updateUser(
      id: $id
      newName: $newName
      password: $password
      newPhone: $newPhone
    ) {
      ok
      user {
        id
        name
        email
        phone
      }
    }
  }
`

export const GET_IMAGE_IDS = gql`
  query allImgObjid($propId: Int!) {
    allImgObjid(propId: $propId) {
      objId
    }
  }
`

export const GET_IMAGE = gql`
  query singleImg($objId: String!) {
    singleImg(objId: $objId)
  }
`

const fragments = {
  userDetails: gql`
    fragment userDetails on User {
      name
      email
      phone
    }
  `,
  userProperties: gql`
    fragment userProperties on User {
      properties {
        id
        street1
        street2
        suburb
        state
        postcode
        description
        guestLimit
      }
    }
  `,
  userWishlist: gql`
    fragment userWishlist on User {
      wishlist {
        id
        street1
        street2
        suburb
        state
        postcode
        description
        guestLimit
      }
    }
  `,
  auth: gql`
    fragment auth on AuthInfoField {
      message
    }
  `,
}

export const USER_DETAILS = gql`
  query user($token: String!) {
    user(token: $token) {
      ...userDetails
      ...auth
    }
  }
  ${fragments.userDetails}
  ${fragments.auth}
`

export const USER_PROPERTIES = gql`
  query user($token: String!) {
    user(token: $token) {
      ...userProperties
      ...auth
    }
  }
  ${fragments.userProperties}
  ${fragments.auth}
`

export const USER_WISHLIST = gql`
  query user($token: String!) {
    user(token: $token) {
      ...userWishlist
      ...auth
    }
  }
  ${fragments.userWishlist}
  ${fragments.auth}
`
