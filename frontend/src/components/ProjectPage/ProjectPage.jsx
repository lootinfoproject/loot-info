import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Web3 from 'web3'
import axios from 'axios'

export default function ProjectPage() {
  const { projectSlug } = useParams()

  console.log(projectSlug)

  useEffect(() => {
    const web3 = new Web3(new Web3.providers.HttpProvider());
    axios.get('https://api.etherscan.io/api?module=contract&action=getabi&address=0xfb6916095ca1df60bb79ce92ce3ea74c37c5d359').then((resp) => {
      const abi = resp.data.result


    })
  }, [])

  return <div></div>
}
