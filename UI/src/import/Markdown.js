import React from 'react'
import ReactMarkdown from 'markdown-to-jsx'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'

export default function Markdown(props) {
  return (
    <div>
      <br />
      <h1>VIP ChallENG research goals</h1>
      <h4>
        This project aims to design and create millimetre-sized solar energy
        harvesting devices that can provide continuous power for medical
        implants and IoT sensors. Specifically, we plan to:
      </h4>
      <ul>
        <li style={{ fontSize: '16px' }}>
          Design and prototype silicon photovoltaic devices capable of charging
          a small lithium ion battery
        </li>
        <li style={{ fontSize: '16px' }}>
          Design and prototype mini lithium ion battery cells that can be
          fabricated on a silicon wafer
        </li>
        <li style={{ fontSize: '16px' }}>
          Demonstrate mini-solar harvesting power systems integrated with
          low-power electrical circuits (e.g., for implants or IoT sensors)
        </li>
        <li style={{ fontSize: '16px' }}>
          Develop computational models of hybrid devices
        </li>
        <li style={{ fontSize: '16px' }}>
          Identify new device designs, sensor distribution methods and
          applications
        </li>
      </ul>
      <br />
      <h1>Research, design or technical ChallENG</h1>
      <ul>
        <li style={{ fontSize: '16px' }}>
          Design and make small silicon photovoltaic devices that can charge a
          mini battery and be integrated on an integrated circuit for
          ultra-miniaturisation
        </li>
        <li style={{ fontSize: '16px' }}>
          Design and make mini lithium ion battery cells that have a high energy
          density
        </li>
        <li style={{ fontSize: '16px' }}>
          Demonstrate prototype implants or sensors
        </li>
        <li style={{ fontSize: '16px' }}>
          Design of solar energy harvesting devices for particular operating
          environments (e.g., under the skin, in the field)
        </li>
        <li style={{ fontSize: '16px' }}>
          Assess the durability of solar energy harvesting devices in diverse
          environments
        </li>
        <li style={{ fontSize: '16px' }}>Ideation</li>
      </ul>
    </div>
  )
}
