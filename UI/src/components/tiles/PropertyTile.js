// @flow
import React from 'react'
import { Card, Item } from 'semantic-ui-react'

import type { DbProperty } from '../../types'
import Image from '../results/Image'
import PropertyModal from '../results/PropertyModal'
import { TileContent, TextContent, ButtonContent } from './TileContent'

export default function PropertyTile(props: DbProperty) {
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
            <PropertyModal {...props} type="BOOK" />
          </ButtonContent>
        </Item>
      </TileContent>
    </Card>
  )
}
