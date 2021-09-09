import { useEffect } from 'react'
import './App.scss';
import AppRouter from './AppRouter'
import axios from 'axios'
import { useDispatch } from 'react-redux'

export default function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    axios.get('/projects').then((resp) => {
      dispatch({ type: 'SET_PROJECTS', projects: resp.data })
      dispatch({ type: 'END_LOADING' })
    })
  }, [dispatch])

  return <div>
    <AppRouter />
  </div>
}
