import { Link } from 'react-router-dom'
import { Container, Row, Col, Alert, ListGroup, ListGroupItemHeading, ButtonGroup, Button } from 'shards-react'
import { Spinner } from 'react-bootstrap'
import { useSelector } from 'react-redux'

export default function ProjectsPage() {
  const projects = useSelector((state) => state.projects)
  const loading = useSelector((state) => state.initialLoading)

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
          loading ?
            <Spinner className='mt-4' animation="border" />
          : projects.length ?
            <ListGroup className='align-items-center mt-4'>
              {
                projects.map((project, index) => {
                  return <div key={index} className='w-50 list-group-item d-flex flex-row'>
                    <Link className='m-auto' to={`/projects/${project.slug}`}>
                      <ListGroupItemHeading className='mb-0'>
                        { project.title }
                      </ListGroupItemHeading>
                    </Link>
                    <ButtonGroup>
                      {
                        project.nft_collection &&
                          <a className='btn btn-light' href={project.nft_collection.collection_url}>
                            View collection
                          </a>
                      }
                      {
                        project.smart_contract &&
                          <a className='ml-2 btn btn-light' href={project.smart_contract.contract_url}>
                            View contract
                          </a>
                      }
                    </ButtonGroup>
                  </div>
                })
              }
            </ListGroup>
            : <span>
              No projects Available
            </span>
        }
      </Col>
    </Row>
  </Container>
}
