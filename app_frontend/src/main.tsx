import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

//Pages
import Home from './routes/Home.tsx'
import ErrorPage from './routes/ErrorPage.tsx'
import Login from './routes/Login.tsx'
import Pessoas from './routes/Pessoas.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage/>,
    children:[
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/pessoas",
        element: <Pessoas/>
      },
      {
        path: "/login",
        element: <Login/>
      },
    ]
  }
])
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
