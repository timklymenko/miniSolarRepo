// @flow
import React, { Suspense, lazy } from 'react'
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import styled from 'styled-components'

import { UserConsumer } from './context/UserContext'
import NavBar from './components/NavBar'
import CenterText from './components/CenterText'
import Header from './import/CompleteHeader'

// Lazy loading
const Home = lazy(() => import('./pages/Home'))
const Leaderboard = lazy(() => import('./pages/Leaderboard'))
const LessonPlan = lazy(() => import('./pages/LessonPlan'))
const About = lazy(() => import('./pages/About'))
const Meet = lazy(() => import('./pages/Meet'))
const HomeMS = lazy(() => import('./import/Blog'))
const Home2000 = lazy(() => import('./import2000/Blog2'))
const Construction = lazy(() => import('./pages/Battery.js'))
const LiveData = lazy(() => import('./pages/LiveData.js'))

const sectionStyle = {
  // width: '100%',
  // height: '800px',
}
const Container = styled.div`
  margin: auto;
  /* width: 60%; */
  padding: 10px;
`

/**
 * Use Route component prop if URL information is required (e.g. Home)
 * location, math, and history props (see react-router-dom docs for more details)
 * Otherwise, use normal child structure
 */

export default function App() {
  return (
    <Router>
      <Header />
      <Container>
        {/* <Header /> */}
        <Suspense fallback={<CenterText text="Loading ... " />}>
          <Switch>
            {/* <Route path="/home" component={Home} /> */}
            <Route path="/home" component={HomeMS} />
            {/* <Route path="/" component={Home2000} /> */}

            <Route path="/battery-leaderboard" component={Leaderboard} />
            <Route path="/lesson-plan" component={LessonPlan} />
            <Route path="/about" component={About} />
            <Route path="/construction" component={Construction} />
            <Route path="/meet" component={Meet} />
            <Route path="/live-data" component={LiveData} />
          </Switch>
        </Suspense>
      </Container>
    </Router>
  )
}
