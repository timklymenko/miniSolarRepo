// @flow
import { Item } from 'semantic-ui-react'
import styled from 'styled-components'

export const TileContent = styled(Item.Group)`
  margin-bottom: 0px !important;
`

export const TextContent = styled(Item.Content)`
  padding: 21px !important;
`

export const ButtonContent = styled(Item.Content)`
  display: flex !important;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  padding: 21px !important;
  margin: 5px !important;

  & > button {
    margin-top: 5px !important;
    margin-bottom: 5px !important;
  }

  & > button:first-child, & > button:last-child {
    margin-top: 0px !important;
    margin-bottom: 0px !important;
  }
`
