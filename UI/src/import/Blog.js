import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import GitHubIcon from '@material-ui/icons/GitHub'
import ChatIcon from '@material-ui/icons/Chat'
import BallotIcon from '@material-ui/icons/Ballot'
import MainFeaturedPost from './MainFeaturedPost'
import FeaturedPost from './FeaturedPost'
import Main from './Main'
import Sidebar from './Sidebar'
import Footer from './Footer'
import background from '../assets/MINI.jpg'
import network from '../assets/global-network.png'
import cloud from '../assets/cloud.png'
// import solarCellsPdf from '../assets/Solar_Cells.pdf'

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}))

const mainFeaturedPost = {
  title: 'Mini Solar',
  description:
    'Bigger isn’t always better, so we’re pushing the boundaries of solar energy to power small devices, like medical implants and IoT sensors, with a sustainable source of energy.',
}

const featuredPosts = [
  {
    title: 'Live Device Data',
    date: 'In production',
    url: '#/live-data',
    description:
      'View live temperature sensor data coming from the Mini Solar device prototype, that would eventually signify a potential fire hazard that would need to be investigated.',
    // image: `url(${cloud})`,
    image:
      'https://icons-for-free.com/iconfiles/png/512/data+internet+network+wireless+worldwide+icon-1320085824335267627.png',
    imageText: 'Image Text',
  },
  {
    title: 'Device Network Configuration',
    date: 'In development',
    url: '#/construction',
    description:
      'Observe a visual representation of the current device configuration, based on network analysis algorithms performed by the base station to eventually help filter out false positives.',
    image: 'https://www.flaticon.com/svg/static/icons/svg/2103/2103658.svg',
    imageText: 'Image Text',
  },
]

const sidebar = {
  title: 'Resources',
  description:
    'Check out the archive: a collection of resources from throughout the 2020 Mini Solar program',
  archives: [
    {
      title: 'What you need to know about solar cells - Udo Roemor',
      // url: `url(${solarCellsPdf})`,
      url: '#',
    },
    { title: 'Other Example Resource - Jane Smith', url: '#' },
  ],
  social: [
    {
      name: 'GitHub',
      icon: GitHubIcon,
      url: 'https://github.com/raymo-nd/mini-solar-UNSW',
    },
    {
      name: 'The ChallENG Program: Mini Solar',
      icon: BallotIcon,
      url: 'https://www.challeng.unsw.edu.au/challeng-projects/mini-solar',
    },
    {
      name: 'Apply',
      icon: ChatIcon,
      url:
        'https://apply.challeng.unsw.edu.au/login/?next=/vertically-integrated-projects/',
    },
  ],
}

export default function Blog() {
  const classes = useStyles()

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
          <Grid container spacing={5} className={classes.mainGrid}>
            <Main title="Read more about the project..." />
            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              archives={sidebar.archives}
              social={sidebar.social}
            />
          </Grid>
        </main>
      </Container>
      <Footer
        title="Mini Solar UI Portal"
        description="Stay tuned for additional functionality!"
      />
    </React.Fragment>
  )
}
