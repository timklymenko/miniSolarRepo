// @flow
import React from 'react'
import styled from 'styled-components'
import { Container } from 'semantic-ui-react'

const Text = styled.h2`
  color: gray;
  padding: 50px 0px 50px 0px;
`

export default function CenterText({ text }: { text: string }) {
  return (
    <Container textAlign="center">
      <Text>{text}</Text>
    </Container>
  )
}
