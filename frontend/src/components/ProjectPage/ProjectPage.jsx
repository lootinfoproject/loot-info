import { useState, useRef, useEffect, useCallback } from 'react'
import { InputGroup, FormInput, InputGroupAddon, Container, Button, Row, Col, Badge, Form, ButtonGroup } from 'shards-react'
import { useParams, Redirect } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'
import { detectClaimed, validateLootProjectToken } from './ProjectPage.js'
import Web3 from 'web3'
import { useSelector } from 'react-redux'
import { useQuery } from 'hooks'
import './ProjectPage.scss'

const web3 = new Web3(Web3.givenProvider || `wss://mainnet.infura.io/ws/v3/${process.env.REACT_APP_INFURA_PROJECT_ID}`)

export default function ProjectPage() {
  const form = useRef()
  const { projectSlug } = useParams()
  const query = useQuery()
  const defaultTokenId = query.get('bagId')
  const defaultTokenIdValid = validateLootProjectToken(defaultTokenId)

  const project = useSelector((state) => state.projects.find((project) => project.slug === projectSlug))
  const loading = useSelector((state) => state.initialLoading)

  const [tokenId, setTokenId] = useState(defaultTokenIdValid ? defaultTokenId : undefined)
  const [inProcess, setInProcess] = useState(false)
  const [derivativeProjects, setDerivativeProjects] = useState([])

  const detectClaimedForToken = useCallback(() => {
    setInProcess(true)

    const requests = project.derivative_projects.map((derivativeProject) => {
      const contract = derivativeProject.contract
      console.log(contract)
      const contractInstance = new web3.eth.Contract(JSON.parse(contract.abi), contract.address)
      return detectClaimed(project, derivativeProject, contractInstance, tokenId)
    })

    Promise.all(requests).then((claimedResults) => {
      setDerivativeProjects(claimedResults)
      setInProcess(false)
    })
  }, [setInProcess, setDerivativeProjects, project, tokenId])

  const submitForm = (e) => {
    e.preventDefault()

    if (!form.current.checkValidity()) {
      form.current.reportValidity()

      return
    }

    detectClaimedForToken()
  }

  useEffect(() => {
    if (defaultTokenIdValid && project) {
      detectClaimedForToken()
    }
  // eslint-disable-next-line
  }, [project, defaultTokenIdValid])

  if (loading)
    return null

  if (project)
    return <>
      <div className="jumbotron jumbotron-fluid d-flex flex-column">
        <h1 className='mx-auto'>{project.title}</h1>
        <Form onSubmit={submitForm} innerRef={form}>
          <InputGroup className='mx-auto w-25 mt-4 token-input-group'>
            <FormInput defaultValue={tokenId}
                       onChange={(e) => setTokenId(e.target.value)}
                       placeholder="Token id"
                       required
                       type="number"
                       min="1"
                       max="8000" />
            <InputGroupAddon type="append">
              <Button disabled={!tokenId} theme="secondary">Check</Button>
            </InputGroupAddon>
          </InputGroup>
        </Form>
      </div>
      <Container className='d-flex flex-column mx-auto'>
        {
          inProcess ?
            <Spinner className='mx-auto mt-3' animation='border' />
          : <div className='d-flex flex-column mx-auto results-list'>
              {
                derivativeProjects.map((project, index) => {
                  return <Row key={index} className={`align-items-center ${index > 0 ? 'mt-3' : ''}`}>
                    <Col className='text-left'>
                      {project.title}
                    </Col>
                    <Col className='text-center'>
                      {
                        project.claimed ?
                          <Badge theme="danger">Claimed</Badge> :
                          <Badge theme="success">Unclaimed</Badge>
                      }
                    </Col>
                    <Col className='text-right'>
                      <ButtonGroup size='sm'>
                        {
                          project.contract &&
                            <a style={!project.collection ? { marginRight: '100px' }: {}} className='btn btn-light' href={project.contract.url}>
                              Etherscan
                            </a>
                        }
                        {
                          project.collection &&
                            <a className='ml-2 btn btn-light' href={project.collection.url}>
                              Open Sea
                            </a>
                        }
                      </ButtonGroup>
                    </Col>
                  </Row>
                })
              }
            </div>
        }
      </Container>
    </>
  else
    return <Redirect to='/' />
}
