import React from 'react'
import Header from './Header'
import { makeStyles } from '@material-ui/core/styles'

const sections = [
  { title: 'Home', url: '#/home' },
  { title: 'Live Data', url: '#/live-data' },
  { title: 'Network Configuration', url: '#/construction' },
  { title: 'PV Team', url: '#/construction' },
  { title: 'PCB Team', url: '#/construction' },
  { title: 'Battery Team', url: '#/construction' },
  { title: 'Design Team', url: '#/construction' },
]

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}))

export default function CompleteHeader() {
  const classes = useStyles()

  return <Header title="Mini Solar User Portal" sections={sections} />
}
