import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Alert } from 'shards-react'
import { Spinner } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

export default function ProjectsPage() {
  const projects = useSelector((state) => state.projects)
  const dispatch = useDispatch()
  const [initialLoading, setInitialLoading] = useState(true)

  useEffect(() => {
    axios.get('/projects').then((resp) => {
      dispatch({type: 'SET_PROJECTS', projects: resp.data})
      setInitialLoading(false)
    })
  }, [])

  return <Container>
    <Row>
      <Col>
        <Alert className='mt-5' theme="light">
          <h3>How it works?</h3>
          <ul>
            <li>
              Select a project
            </li>
            <li>
              Insert your token id
            </li>
            <li>
              See all projects you can mint items for free as a token holder
            </li>
          </ul>
        </Alert>
      </Col>
    </Row>
    <Row>
      <Col className='mt-5 text-center'>
        <h3>Available projects</h3>
        {
          initialLoading ?
            <Spinner className='mt-4' animation="border" />
          : projects.length ?
            <ul>
              {
                projects.map((project) => {
                  return <li>
                    <Link to={`/projects/${project.slug}`}>
                      { project.title }
                    </Link>
                  </li>
                })
              }
            </ul>
            : <span>
              No projects Available
            </span>
        }
      </Col>
    </Row>
  </Container>
}
