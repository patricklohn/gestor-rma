import NavBar from '../components/NavBar'
import classes from './DadosToken.module.css'
import { useAuth } from '../context/AuthContext'

const DadosToken = () => {
  const {user} = useAuth();
  return (
    <div className={classes.DadosToken}>
      <NavBar />
      <div className={classes.DadosToken_container}>
        <h1>Dados Usuario</h1>
        <div>
          <span>Email: {user?.email || "Usuario não logado"}</span>
          <span>Permissão: {user?.role || "Usuario não logado"}</span>
          <span>Nome: {user?.name || "Usuario não logado"}</span>
        </div>
      </div>
    </div>
  )
}

export default DadosToken