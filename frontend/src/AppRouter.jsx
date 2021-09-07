import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import ProjectPage from './components/ProjectPage/ProjectPage.jsx'
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
