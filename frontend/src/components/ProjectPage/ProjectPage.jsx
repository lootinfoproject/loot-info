import { useState } from 'react'
import { InputGroup, FormInput, InputGroupAddon, Container, Button, Row, Col, Badge } from 'shards-react'
import { useParams, Redirect } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'
import { detectClaimed } from './ProjectPage.js'
import Web3 from 'web3'
import { useSelector } from 'react-redux'
import './ProjectPage.scss'

const web3 = new Web3(Web3.givenProvider);

export default function ProjectPage() {
  const { projectSlug } = useParams()
  const project = useSelector((state) => state.projects.find((project) => project.slug === projectSlug))
  const [tokenId, setTokenId] = useState()
  const [inProcess, setInProcess] = useState(false)
  const [claimedState, setClaimedState] = useState([])

  const detectClaimedForToken = () => {
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

  console.log(inProcess)
  console.log(claimedState)

  if (project)
    return <>
      <div className="jumbotron jumbotron-fluid align-items-center d-flex flex-column">
        <h1>{project.title}</h1>
        <InputGroup className='w-25 mt-4 token-input-group'>
          <FormInput defaultValue={tokenId}
                    onChange={(e) => setTokenId(e.target.value)}
                    placeholder="tokenId" />
          <InputGroupAddon type="append">
            <Button disabled={!tokenId} onClick={detectClaimedForToken} theme="secondary">Check</Button>
          </InputGroupAddon>
        </InputGroup>
      </div>
      <Container>
        {
          inProcess ?
            <Spinner className='mx-auto mt-3' animation='border' />
          : claimedState.map((rec, index) => {
            return <Row className={`text-center ${index > 0 ? 'mt-3' : ''}`}>
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
      </Container>
    </>
  else
    return <Redirect to='/' />
}
