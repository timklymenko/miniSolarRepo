// @flow
import React from 'react'
import { Card, Item, Button } from 'semantic-ui-react'

import type { DbProperty } from '../../types'
import API from '../../api'
import Image from '../results/Image'
import ManageModal from '../ManageModal'
import { TileContent, TextContent, ButtonContent } from './TileContent'

export default function ManageTile(props: DbProperty) {
  const handleClick = () => {
    API.deleteProperty(props.id)
  }

  return (
    <Card fluid>
      <TileContent>
        <Item>
          <Image propId={props.id} />
          <TextContent>
            <Item.Header>{props.street1}</Item.Header>
            <Item.Meta>{props.postcode}</Item.Meta>
            <Item.Description>{`${props.suburb}, ${props.state}`}</Item.Description>
          </TextContent>
          <ButtonContent>
            <ManageModal {...props} />
            <Button color="red" onClick={handleClick}>
              Remove Listing
            </Button>
          </ButtonContent>
        </Item>
      </TileContent>
    </Card>
  )
}
