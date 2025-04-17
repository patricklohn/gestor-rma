import './App.css'
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <div className='App'>
      <div className='container-body'>
        <Outlet/>
      </div>
    </div>
  )
}

export default App
