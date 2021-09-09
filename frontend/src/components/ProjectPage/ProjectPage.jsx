import { useState, useRef } from 'react'
import { InputGroup, FormInput, InputGroupAddon, Container, Button, Row, Col, Badge, Form } from 'shards-react'
import { useParams, Redirect } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'
import { detectClaimed } from './ProjectPage.js'
import Web3 from 'web3'
import { useSelector } from 'react-redux'
import './ProjectPage.scss'

const web3 = new Web3(Web3.givenProvider || `wss://mainnet.infura.io/ws/v3/${process.env.REACT_APP_INFURA_PROJECT_ID}`)

export default function ProjectPage() {
  const form = useRef()
  const { projectSlug } = useParams()
  const project = useSelector((state) => state.projects.find((project) => project.slug === projectSlug))
  const loading = useSelector((state) => state.initialLoading)

  const [tokenId, setTokenId] = useState()
  const [inProcess, setInProcess] = useState(false)
  const [claimedState, setClaimedState] = useState([])

  const detectClaimedForToken = (e) => {
    e.preventDefault();

    if (!form.current.checkValidity()) {
      form.current.reportValidity()

      return
    }

    setInProcess(true)

    const requests = project.smart_contracts.map((projectContract) => {
      const contractInstance = new web3.eth.Contract(JSON.parse(projectContract.abi), projectContract.address)

      return detectClaimed(project, projectContract, contractInstance, tokenId)
    })

    Promise.all(requests).then((claimedResults) => {
      setClaimedState(
        claimedResults.map((result, index) => (
          { name: project.smart_contracts[index].title, claimed: result })
        )
      )
      setInProcess(false)
    })
  }

  console.log(project)
  console.log(projectSlug)
  console.log(loading)

  if (loading)
    return null

  if (project)
    return <>
      <div className="jumbotron jumbotron-fluid d-flex flex-column">
        <h1 className='mx-auto'>{project.title}</h1>
        <Form onSubmit={detectClaimedForToken} innerRef={form}>
          <InputGroup className='mx-auto w-25 mt-4 token-input-group'>
            <FormInput defaultValue={tokenId}
                       onChange={(e) => setTokenId(e.target.value)}
                       placeholder="Token id"
                       required
                       type="number"
                       min="1"
                       max="8000" />
            <InputGroupAddon type="append">
              <Button disabled={!tokenId} onClick={detectClaimedForToken} theme="secondary">Check</Button>
            </InputGroupAddon>
          </InputGroup>
        </Form>
      </div>
      <Container className='d-flex flex-column mx-auto'>
        {
          inProcess ?
            <Spinner className='mx-auto mt-3' animation='border' />
          : <div className='d-flex flex-column w-100 mx-auto'>
              {
                claimedState.map((rec, index) => {
                  return <Row key={index} className={`text-center ${index > 0 ? 'mt-3' : ''}`}>
                    <Col>{rec.name}</Col>
                    <Col>
                      {
                        rec.claimed ?
                          <Badge theme="danger">Claimed</Badge> :
                          <Badge theme="success">Unclaimed</Badge>
                      }
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
