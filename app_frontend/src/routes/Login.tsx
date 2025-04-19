import classes from './Login.module.css'
import logo from '../assets/LogoA.png'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import RmaApi from '../axios/config'

const Login = () => {

  const[email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async(e: React.FormEvent) =>{
    e.preventDefault();
    try {
      const response = await RmaApi.post('/login/userLogin', {email, senha});
      if(response.status === 200){
        const { token} = response.data;
        localStorage.setItem('token', token);
        toast.success("Login realizado com sucesso!")
        navigate("/")
      }
      
    } catch (error) {
      console.log(error)
      toast.error("Algum erro ocorreu ao tentar efetuar o Login!")
    }
  }

  return (
    <div className={classes.login_container}>
      <div className={classes.login_logo_container}>
        <h1>Login</h1>
        <p>Entre com o seu usuario</p>
        <img src={logo} alt='Imagem Logo'/>
      </div>
      <div className={classes.login_form_container}>
        <form onSubmit={handleSubmit}>
          <div className={classes.login_formInput_container}>
            <label htmlFor="">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className={classes.login_formInput_container}>
            <label htmlFor="">Senha</label>
            <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
          </div>
          <input type="submit" value="Entrar"/>
        </form>
      </div>
    </div>
  )
}

export default Login
