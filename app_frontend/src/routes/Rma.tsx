import React from 'react'
import classes from './Rma.module.css'
import NavBar from '../components/NavBar'

const Rma = () => {
  return (
    <div className={classes.rma}>
      <NavBar/>
      <div className={classes.rma_container}>
        <h1>Rma</h1>
      </div>
    </div>
  )
}

export default Rma