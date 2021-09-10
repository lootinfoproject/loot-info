import { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import axios from 'axios'

export default function FloorDashboard() {
  const [collections, setCollections] = useState()

  useEffect(() => {
    axios.get('/collections').then((resp) => {
      setCollections(resp.data)
    })
  }, [])

  return <Table striped bordered>
    <thead>
      <tr>
        <th>Project</th>
        <th>Previous Floor</th>
        <th>Current Floor</th>
        <th>% Change</th>
      </tr>
    </thead>
    <tbody>
    </tbody>
  </Table>

}
