import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute.tsx'
import { AuthProvider } from './context/AuthContext.tsx'


//Pages
import Home from './routes/Home.tsx'
import ErrorPage from './routes/ErrorPage.tsx'
import Login from './routes/Login.tsx'
import Pessoas from './routes/Pessoas.tsx'
import Produtos from './routes/Produtos.tsx'
import Rma from './routes/Rma.tsx'
import DadosToken from './routes/DadosToken.tsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage/>,
    children:[
      {
        path: "/",
        element: <Login/>
      },
      {
        path: "/dados",
        element: <DadosToken/>
      },
      {
        element: <PrivateRoute/>,
        children:[
          {
            path: "/home",
            element: <Home/>
          },
          {
            path: "/pessoas",
            element: <Pessoas/>
          },
          {
            path: "/produtos",
            element: <Produtos/>
          },
          {
            path: "/Rma",
            element: <Rma/>
          },
        ]
      }
    ]
  }
])
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  </StrictMode>,
)
