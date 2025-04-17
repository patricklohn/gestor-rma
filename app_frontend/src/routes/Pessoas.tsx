import classes from './Pessoas.module.css'

import NavBar from '../components/NavBar'

const Pessoas = () => {
  return (
    <div className={classes.pessoas}>
      <NavBar />
      <div className={classes.pessoas_container}>
        <h1>Pessoas</h1>
      </div>
    </div>
  )
}

export default Pessoas