import classes from './Login.module.css'
import logo from '../assets/LogoA.png'

const Login = () => {
  return (
    <div className={classes.login_container}>
      <div className={classes.login_logo_container}>
        <h1>Login</h1>
        <p>Entre com o seu usuario</p>
        <img src={logo} alt='Imagem Logo'/>
      </div>
      <div className={classes.login_form_container}>
        <form action="">
          <div className={classes.login_formInput_container}>
            <label htmlFor="">Email</label>
            <input type="email" required />
          </div>
          <div className={classes.login_formInput_container}>
            <label htmlFor="">Senha</label>
            <input type="password" required />
          </div>
          <input type="submit" value="Entrar"/>
        </form>
      </div>
    </div>
  )
}

export default Login
