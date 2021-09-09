import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import ProjectPage from './components/ProjectPage/ProjectPage.jsx'
import ProjectsPage from './components/ProjectsPage/ProjectsPage'
import { Navbar } from 'shards-react'
import { Link } from 'react-router-dom'

export default function AppRouter() {
  return <Router>
    <Navbar type='dark' theme='secondary'>
      <Link className='navbar-link navbar-brand' to='/'>Loot info</Link>
    </Navbar>

    <Switch>
      <Route path='/projects/:projectSlug'>
        <ProjectPage />
      </Route>
      <Route path='/'>
        <ProjectsPage />
      </Route>
    </Switch>
  </Router>
}
