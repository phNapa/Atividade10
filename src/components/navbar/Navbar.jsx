import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex pb-20'>
        <ul className='flex w-screen justify-between text-center font-medium text-indigo-600 hover:text-indigo-800'>
          <li>
            <Link to="/usuarios">Usuários</Link>
          </li>
          <li>
            <Link to="/solicitantes">Solicitantes</Link>
          </li>
          <li>
            <Link to="/solicitacoes-de-analise">Solicitações de Análise</Link>
          </li>
          <li>
            <Link to="/amostras">Amostras</Link>
          </li>
          <li>
            <Link to="/analises">Analises</Link>
          </li>
        </ul>
    </div>
  )
}

export default Navbar