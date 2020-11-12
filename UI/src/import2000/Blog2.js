import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import GitHubIcon from '@material-ui/icons/GitHub'
import ChatIcon from '@material-ui/icons/Chat'
import BallotIcon from '@material-ui/icons/Ballot'
import Header from './Header'
import MainFeaturedPost from './MainFeaturedPost'
import FeaturedPost from './FeaturedPost'
import Main from './Main'
import Sidebar from './Sidebar'
import Footer from './Footer'
import network from '../assets/global-network.png'
import cloud from '../assets/cloud.png'
// import solarCellsPdf from '../assets/Solar_Cells.pdf'

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}))

const sections = [
  { title: 'Home', url: '#' },
  { title: 'Lesson Plan', url: '#' },
  { title: 'Leaderboard', url: '#' },
  { title: 'About', url: '#' },
]

const mainFeaturedPost = {
  title: 'Reneweable Energy Generation Race',
  description:
    'Learn about renewable energy generators, and then use this knowledge to compete against each other to charge your batteries and race your cars!',
}

const featuredPosts = [
  {
    title: 'Lesson Plan',
    date: 'In production',
    description: 'Look through the ',
    // image: `url(${cloud})`,
    image:
      'https://www.russellkennedy.com.au/Images/UserUploadedImages/291/Renewable-Energy-Wind-Farm-banner-1900-x-500.jpg',
    imageText: 'Image Text',
  },
  {
    title: 'Device Network Configuration',
    date: 'In development',
    description:
      'Observe a visual representation of the current device configuration',
    image:
      'https://icons-for-free.com/iconfiles/png/512/data+internet+network+wireless+worldwide+icon-1320085824335267627.png',
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
      // url:
      //   'file:///Users/timklymenko/Desktop/2000/UI/src/assets/Solar_Cells.pdf',
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
        <Header title="DESN 2000 Group Epsilon" sections={sections} />
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
