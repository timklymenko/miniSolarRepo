// @flow
import React from 'react'
import { useQuery } from '@apollo/react-hooks'

import { PROPERTIES } from '../../api/QUERIES'
import CenterText from '../CenterText'
import Properties from './Properties'

type Props = {
  selectedSuburb: string,
  selectedPage: number | null,
}

export default function Results(props: Props) {
  const { selectedSuburb, selectedPage } = props

  const { loading, error, data } = useQuery(PROPERTIES, {
    variables: {
      suburb: selectedSuburb,
    },
  })
  if (error) {
    console.error(error)
    return <CenterText text="Oops, something unexpected happened" />
  }
  if (loading) {
    return <CenterText text="Loading ..." />
  }

  return (
    <Properties suburb={selectedSuburb} page={selectedPage} properties={data.properties} />
  )
}
