// @flow
import ApolloClient from 'apollo-client'
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory'
import { createUploadLink } from 'apollo-upload-client'
import introspectionQueryResultData from './fragments.json'

import type { Property, AuthUser, Booking, BookingChange } from '../types'
import * as QUERIES from './QUERIES'

export default class API {
  static client = new ApolloClient({
    cache: new InMemoryCache({
      fragmentMatcher: new IntrospectionFragmentMatcher({
        introspectionQueryResultData,
      }),
    }),
    // uri: process.env.NODE_ENV === 'production'
    //   ? 'https://jgardner-server.au.ngrok.io/graphql'
    //   : 'http://127.0.0.1:5000/graphql',
    link: createUploadLink({ uri: 'http://127.0.0.1:5000/graphql' }),
  })

  static getSuburbs() {
    return this.client.query({
      query: QUERIES.SUBURBS,
    })
  }

  static getReviews(id: number) {
    return this.client.query({
      query: QUERIES.REVIEWS,
      variables: {
        id,
      },
    })
  }

  static getBookings() {
    return this.client.query({
      query: QUERIES.BOOKINGS,
    })
  }

  static uploadProperty(property: Property, userId: number, image: File) {
    this.client
      .mutate({
        mutation: QUERIES.UPLOAD_PROPERTY,
        variables: { ...property, userId },
      })
      .then(
        res =>
          res.data.createProperty.ok &&
          this.client.mutate({
            mutation: QUERIES.UPLOAD_IMAGE,
            variables: {
              fileIn: image,
              propId: res.data.createProperty.property.id,
              name: image.name,
            },
          }),
      )
  }

  static deleteProperty(propId: number) {
    this.client.mutate({
      mutation: QUERIES.DELETE_PROPERTY,
      variables: { propId },
    })
  }

  static editProperty(propId: number, guestLimit: number, description: string) {
    return this.client
      .mutate({
        mutation: QUERIES.EDIT_PROPERTY,
        variables: {
          id: propId,
          guestLimit,
          description,
        },
      })
      .then(res => res.data.updateProperty)
  }

  static bookProperty({ userId, propertyId, from, to }: Booking) {
    return this.client
      .mutate({
        mutation: QUERIES.BOOK_PROPERTY,
        variables: {
          userId,
          propId: propertyId,
          startDate: from.toISOString(),
          endDate: to.toISOString(),
        },
      })
      .then(res => res.data.createBooking)
  }

  static editBooking({ bookingId, from, to }: BookingChange) {
    return this.client
      .mutate({
        mutation: QUERIES.EDIT_BOOKING,
        variables: {
          bookingId,
          startDate: from.toISOString(),
          endDate: to.toISOString(),
        },
      })
      .then(res => res.data.editBooking)
  }

  static deleteBooking(bookingId: number) {
    return this.client
      .mutate({
        mutation: QUERIES.DELETE_BOOKING,
        variables: {
          bookingId,
        },
      })
      .then(res => res.data.deleteBooking)
  }

  static updateBookingReview(
    bookingId: number,
    review: string,
    rating: number,
  ) {
    return this.client
      .mutate({
        mutation: QUERIES.ADD_REVIEW,
        variables: {
          bookingId,
          review,
          rating,
        },
      })
      .then(res => res.data.updateBookingReview)
  }

  static updateBookingStayed(bookingId: number) {
    return this.client
      .mutate({
        mutation: QUERIES.HAS_STAYED,
        variables: {
          bookingId,
        },
      })
      .then(res => res.data.updateBookingReview)
  }

  static login({ email, password }: AuthUser) {
    return this.client
      .mutate({
        mutation: QUERIES.LOGIN,
        variables: {
          email,
          password,
        },
      })
      .then(res => res.data.auth)
  }

  static logout(token: string) {
    this.client.mutate({
      mutation: QUERIES.LOGOUT,
      variables: {
        token,
      },
    })
  }

  static signup(user: AuthUser) {
    return this.client
      .mutate({
        mutation: QUERIES.SIGNUP,
        variables: user,
      })
      .then(res => res.data.createUser)
  }

  static changeDetails(
    id: number,
    newName: string,
    newPhone: string,
    newPassword: string,
  ) {
    if (newPassword) {
      return this.client
        .mutate({
          mutation: QUERIES.CHANGE_DETAILS_PASSWORD,
          variables: {
            id,
            newName,
            newPhone,
            newPassword,
          },
        })
        .then(res => res.data.updateUser)
    }
    return this.client
      .mutate({
        mutation: QUERIES.CHANGE_DETAILS,
        variables: {
          id,
          newName,
          newPhone,
        },
      })
      .then(res => res.data.updateUser)
  }

  static getUserWithToken(token: string) {
    return this.client.query({
      query: QUERIES.USER_DETAILS,
      variables: { token },
    })
  }

  static getWishlist(token: string) {
    return this.client
      .query({
        query: QUERIES.USER_WISHLIST,
        variables: { token },
      })
      .then(res => res.data.user.wishlist)
  }

  static addFavourite(userId: number, propertyId: number) {
    this.client.mutate({
      mutation: QUERIES.ADD_FAVOURITE,
      variables: {
        userId,
        propId: propertyId,
      },
    })
  }

  static removeFavourite(userId: number, propertyId: number) {
    this.client.mutate({
      mutation: QUERIES.REMOVE_FAVOURITE,
      variables: {
        userId,
        propId: propertyId,
      },
    })
  }

  static getImage(propId: number) {
    return this.client
      .query({
        query: QUERIES.GET_IMAGE_IDS,
        variables: { propId },
      })
      .then(
        res => res.data.allImgObjid.length > 0 && res.data.allImgObjid[0].objId,
      )
      .then(
        objId =>
          objId &&
          this.client.query({
            query: QUERIES.GET_IMAGE,
            variables: { objId },
          }),
      )
      .then(res => res && res.data.singleImg)
  }
}
