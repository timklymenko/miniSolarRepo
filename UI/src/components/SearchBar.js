// @flow
import React, { Component } from 'react'
import { Search } from 'semantic-ui-react'
import debounce from 'lodash.debounce'

import API from '../api'

type SuburbType = {
  key: string,
  title: string,
}

type Props = {
  search: string,
  handleResultSelect: (string) => void,
}

type State = {
  loading: boolean,
  search: string,
  suburbs: SuburbType[],
  results: SuburbType[],
}

export default class SearchBar extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      loading: true,
      search: this.props.search,
      suburbs: [],
      results: [],
    }
    API.getSuburbs().then(({ data: { suburbs } }) => this.setState({
      loading: false,
      suburbs: suburbs.map(s => ({
        key: s.name,
        title: `${s.name} (${s.postcodes.join(', ')})`,
      })),
    }))
  }

  handleSearchChange = (search: string) => {
    const { suburbs } = this.state
    const re = new RegExp(search, 'i')
    this.setState({
      search,
      results: suburbs.filter(s => re.test(s.title)),
    })
  }

  render() {
    return (
      <Search
        fluid
        selectFirstResult
        size="huge"
        placeholder="Where would you like to stay?"
        loading={this.state.loading}
        input={{ fluid: true }}
        value={this.state.search}
        results={this.state.results}
        onResultSelect={(_, { result: { key, title } }) => {
          this.setState({ search: key })
          this.props.handleResultSelect(key)
          this.handleSearchChange(title)
        }}
        onSearchChange={debounce(
          (_, { value }) => this.handleSearchChange(value),
          500,
          { leading: true },
        )}
      />
    )
  }
}
