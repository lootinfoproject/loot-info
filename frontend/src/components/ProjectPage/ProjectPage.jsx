import { useState, useRef, useEffect, useCallback } from 'react'
import { InputGroup, FormInput, InputGroupAddon, Container, Button, Row, Col, Badge, Form, ButtonGroup } from 'shards-react'
import { useParams, Redirect, Link, useHistory } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'
import { detectClaimed, validateLootProjectToken } from './ProjectPage.js'
import Web3 from 'web3'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { formatNumber } from 'helpers'
import { useQuery } from 'hooks'
import './ProjectPage.scss'
import ProjectInfo from './components/ProjectInfo'

const web3 = new Web3(Web3.givenProvider || `wss://mainnet.infura.io/ws/v3/${process.env.REACT_APP_INFURA_PROJECT_ID}`)

export default function ProjectPage() {
  const form = useRef()
  const { projectSlug } = useParams()
  const query = useQuery()
  const history = useHistory()
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
      const contractInstance = new web3.eth.Contract(JSON.parse(contract.abi), contract.address)

      let infoPromise
      if (derivativeProject.collection.standard === 'ERC-20') {
        infoPromise = axios.post(`/collections/${derivativeProject.collection.id}/current_price`).then((resp) => {
          return { currentPrice: resp.data }
        })
      } else {
        infoPromise = contractInstance.methods.totalSupply().call().then((res) => ({ totalSupply: res }))
      }

      return Promise.all([
        infoPromise,
        detectClaimed(project, derivativeProject, contractInstance, tokenId)
      ])
    })

    Promise.all(requests).then((claimedResults) => {
      setDerivativeProjects(claimedResults.map((result) => {
        return result.reduce((acc, currentValue) => {
          return { ...acc, ...currentValue }
        }, {})
      }).sort((a, b) => Number(a.totalSupply) > Number(b.totalSupply) ? -1 : 1))
      setInProcess(false)
    })
  }, [setInProcess, setDerivativeProjects, project, tokenId])

  const submitForm = (e) => {
    e.preventDefault()

    if (!form.current.checkValidity()) {
      form.current.reportValidity()

      return
    }

    history.push(`/projects/${project.slug}?bagId=${tokenId}`)
    detectClaimedForToken()
  }

  useEffect(() => {
    if (defaultTokenIdValid && project) {
      detectClaimedForToken()
    }
  // eslint-disable-next-line
  }, [project, defaultTokenIdValid])

  useEffect(() => {
    setDerivativeProjects([])
  }, [project])

  if (loading)
    return null

  if (project)
    return <>
      <ProjectInfo project={project}>
        {
          project.derivative_projects.length > 0 &&
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
        }
      </ProjectInfo>
      <Container className='d-flex flex-column mx-auto'>
        {
          inProcess ?
            <Spinner className='mx-auto mt-3' animation='border' />
          : <div className='d-flex flex-column mx-auto results-list'>
              {
                derivativeProjects.map((project, index) => {
                  return <Row key={index} className={`align-items-center ${index > 0 ? 'mt-3' : ''}`}>
                    <Col className='text-left'>
                      <Link to={`/projects/${project.slug}`}>{project.title}</Link>
                    </Col>
                    <Col className='text-center'>
                      {
                        project.claimed ?
                          <Badge theme="danger">Claimed</Badge> :
                          <Badge theme="success">Unclaimed</Badge>
                      }
                    </Col>
                    <Col>
                      { project.collection.standard === 'ERC-20' && project.currentPrice &&
                        <>
                          <span className='color-black'>FMV for claim:</span> ${formatNumber(project.currentPrice * 10000)}
                        </>
                      }
                      { project.collection.standard === 'ERC-721' && project.totalSupply &&
                        <>
                          <span className='color-black'>Total supply:</span> {formatNumber(project.totalSupply)}
                        </>
                      }
                    </Col>
                    <Col className='text-right'>
                      <ButtonGroup size='sm'>
                        {
                          project.contract &&
                            <a style={!project.collection ? { marginRight: '100px' }: {}} target="_blank" rel="noreferrer" className='btn btn-light' href={project.contract.url}>
                              Etherscan
                            </a>
                        }
                        {
                          project.collection &&
                            <a className='ml-2 btn btn-light' target="_blank" rel="noreferrer" href={project.collection.url}>
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
