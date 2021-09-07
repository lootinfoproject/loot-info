import './App.scss';
import AppRouter from './AppRouter'
import { Navbar, NavbarBrand } from 'shards-react'

export default function App() {
  return <div>
    <Navbar type='dark' theme='secondary'>
      <NavbarBrand href="/">Mint with Project</NavbarBrand>
    </Navbar>
    <AppRouter />
  </div>
}
