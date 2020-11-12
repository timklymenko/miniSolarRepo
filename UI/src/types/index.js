/* eslint-disable import/prefer-default-export */
// @flow

export type Property = {
  street1: string,
  street2?: string | null,
  suburb: string,
  state: string,
  postcode: number,
  description: string,
  guestLimit: number,
}

export type DbProperty = {
  ...Property,
  id: number,
}

export type PropertyList = DbProperty[]

export const blankProperty: Property = {
  street1: '',
  suburb: '',
  state: '',
  postcode: 0,
  description: '',
  guestLimit: 0,
}

export type User = {
  id?: number,
  name: string,
  email: string,
  phone: string,
  type?: 'Tenant' | 'Manager',
}

export type AuthUser = {
  ...User,
  password: string,
}

export const blankUser: AuthUser = {
  name: '',
  email: '',
  phone: '',
  password: '',
}

export type DateRange = {
  from: ?Date,
  to: ?Date,
}

export type Booking = {
  userId: number,
  propertyId: number,
  from: Date,
  to: Date,
}

export type JustBooking = {
  id: number,
  startDate: string,
  endDate: string,
}

export type DbBooking = {
  ...JustBooking,
  property: DbProperty,
}

export type BookingChange = {
  bookingId: number,
  from: Date,
  to: Date,
}

export type BookingsList = DbBooking[]
