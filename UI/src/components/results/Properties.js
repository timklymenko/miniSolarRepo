// @flow
import React, { Component, type Node } from 'react'
import { withRouter, type History } from 'react-router-dom'
import { Segment, Pagination } from 'semantic-ui-react'
import styled from 'styled-components'

import type { PropertyList } from '../../types'
import CenterText from '../CenterText'
import PropertyTile from '../tiles/PropertyTile'

const Text = styled.h4`
  color: gray;
`

const PAGE_LEN = 20
const calculateTotalPages = (properties: PropertyList) => Math.ceil(properties.length / PAGE_LEN)

type Props = {
  suburb?: string | null,
  page?: number | null,
  properties: PropertyList,
  history: History,
}

type State = {
  suburb: string | null,
  currentPage: number,
  totalPages: number,
}

class Properties extends Component<Props, State> {
  static defaultProps = {
    suburb: null,
    page: null,
  }

  constructor(props: Props) {
    super(props)
    this.state = {
      suburb: props.suburb || null,
      currentPage: props.page || 1,
      totalPages: calculateTotalPages(props.properties),
    }
  }

  static getDerivedStateFromProps(nextProps: Props, prevState: Props) {
    if (!prevState.suburb) return prevState
    if (nextProps.suburb !== prevState.suburb) {
      return {
        suburb: nextProps.suburb,
        currentPage: 1,
        totalPages: calculateTotalPages(nextProps.properties),
      }
    }
    return prevState
  }

  handlePageChange = (currentPage: number) => {
    this.setState({ currentPage })
    if (this.props.suburb) {
      this.props.history.push(`/?q=${this.props.suburb}&page=${currentPage}`)
    }
  }

  renderPropertiesNumber = () => {
    const len = this.props.properties.length
    return (
      <Segment basic compact floated="left">
        <Text>{`${len} Propert${len === 1 ? 'y' : 'ies'}`}</Text>
      </Segment>
    )
  }

  renderPaginator = () => (
    <>
      <Segment
        basic
        compact
        floated="right"
        as={Pagination}
        activePage={this.state.currentPage}
        onPageChange={(_, { activePage }) => this.handlePageChange(activePage)}
        totalPages={this.state.totalPages}
        firstItem={null}
        lastItem={null}
      />
      {this.renderPropertiesNumber()}
    </>
  )

  renderProperties = (properties: PropertyList): Node => properties.map(property => (
    <PropertyTile key={property.id} {...property} />
  ))

  render() {
    const { properties } = this.props

    if (properties.length === 0) {
      return <CenterText text="No Properties" />
    }

    if (properties.length <= PAGE_LEN) {
      return (
        <>
          {this.renderPropertiesNumber()}
          {this.renderProperties(properties)}
        </>
      )
    }

    const startingProperty = (this.state.currentPage - 1) * PAGE_LEN
    const pagedProperties = properties.slice(startingProperty, startingProperty + PAGE_LEN)

    return (
      <>
        {this.renderPaginator()}
        {this.renderProperties(pagedProperties)}
        {this.renderPaginator()}
      </>
    )
  }
}

export default withRouter(Properties)
