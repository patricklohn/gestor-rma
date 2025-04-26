import React from 'react'
import classes from './Rma.module.css'
import NavBar from '../components/NavBar'
import {useNavigate} from "react-router-dom"

const Rma = () => {
  const navigate = useNavigate();

  return (
    <div className={classes.rma}>
      <NavBar/>
      <div className={classes.rma_container}>
        <h1>Rma</h1>
        <div className={classes.rma_create}>
          <h2>Criação de RMA</h2>
          <p>Para criar um novo RMA, clique no botão abaixo.</p>
          <button onClick={() => navigate('rma/create')} className='rma_btn_create'>
            Criar Rma
          </button>
        </div>
      </div>
    </div>
  )
}

export default Rma