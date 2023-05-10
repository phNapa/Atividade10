import './Analise.css'
import Navbar from './components/navbar/Navbar'
import { Outlet } from 'react-router-dom'

function App() {
  

  return (
    <div className='m-0 p-0 box-border'>
      <Navbar/>
      <Outlet/>
    </div>
  )
}

export default App
