// @flow
import React, { useState } from 'react'
import { Item } from 'semantic-ui-react'

import API from '../../api'

export default function (props: { propId: number }) {
  const [image, setImage] = useState(null)

  API.getImage(props.propId).then((img) => setImage(img))

  if (image) {
    return <Item.Image size="small" src={`data:image/png;base64,${image}`} />
  }

  return null
}
