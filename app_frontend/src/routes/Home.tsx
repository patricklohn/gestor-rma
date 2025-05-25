import NavBar from "../components/NavBar"
import classes from "./Home.module.css"
import {decodeToken} from "../helpers/authLogin"


const Home = () => {
  const user = decodeToken()
  if (!user){
    console.log("Sem informações do usuário")
    return
  }
  return (
    <div className={classes.home}>
      <NavBar />
      <div className={classes.home_container}>
        <h1>Bem vindo {user.name || "Usuario"}</h1>
      </div>
    </div>
  )
}

export default Home
