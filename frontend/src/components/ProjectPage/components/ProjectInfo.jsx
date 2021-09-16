import { Container, ButtonGroup } from 'shards-react'
import './ProjectInfo.scss'

export default function ProjectInfo({project, children}) {
  return <div className="jumbotron jumbotron-fluid d-flex flex-column">
    <Container className='d-flex flex-column align-items-center'>
      { project.image_url && <img className='project-info__logo' src={project.image_url} /> }

      <div className='d-flex flex-column mt-4'>
        <h1 className='mx-auto'>{project.title}</h1>
        <p className='project-info__description mt-2 mx-auto text-center'>{project.description}</p>
      </div>

      <ButtonGroup className='project-info__absolute-links'>
        {
          project.contract &&
            <a target="_blank" className='btn btn-secondary' href={project.contract.url}>
              Etherscan
            </a>
        }
        {
          project.collection &&
            <a target="_blank" className='ml-2 btn btn-secondary' href={project.collection.url}>
              Open Sea
            </a>
        }
      </ButtonGroup>

      { children }
    </Container>
  </div>
}
