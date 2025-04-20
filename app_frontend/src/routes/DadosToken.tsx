import NavBar from '../components/NavBar'
import classes from './DadosToken.module.css'

const DadosToken = () => {
  return (
    <div className={classes.DadosToken}>
      <NavBar />
      <div className={classes.DadosToken_container}>
        <h1>Dados</h1>
      </div>
    </div>
  )
}

export default DadosToken