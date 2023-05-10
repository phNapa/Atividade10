import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Analises from './pages/analises/Analises.jsx'
import Usuarios from './pages/usuarios/Usuarios.jsx'
import Solicitantes from './pages/solicitantes/Solicitantes.jsx'
import SolicitacoesDeAnalise from './pages/solicitacoesDeAnalise/SolicitacoesDeAnalise.jsx'
import Amostras from './pages/amostras/Amostras.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        path: '/usuarios',
        element: <Usuarios/>
      },
      {
        path: '/solicitantes',
        element: <Solicitantes/>
      },
      {
        path: '/solicitacoes-de-analise',
        element: <SolicitacoesDeAnalise/>
      },
      {
        path: '/amostras',
        element: <Amostras/>
      },
      {
        path: '/analises',
        element: <Analises/>
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
