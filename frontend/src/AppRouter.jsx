import { BrowserRouter as Router, Redirect, Switch, Link, Route } from "react-router-dom"
import ProjectPage from './components/ProjectPage/ProjectPage'
import ProjectsPage from './components/ProjectsPage/ProjectsPage'

export default function AppRouter() {
  return <Router>
    {/* <div>
      <ul>
        <li>
          <Link to='/projects/link'>Link</Link>
        </li>
      </ul>
    </div> */}

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
