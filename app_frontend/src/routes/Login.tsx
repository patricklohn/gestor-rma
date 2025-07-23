import classes from './Login.module.css'
import logo from '../assets/LogoA.png'
import { useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import RmaApi from '../axios/config'
import axios from 'axios';

const Login = () => {

  const[email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();
  const [isFetching, setIsFetching] = useState(false);

  const handleSubmit = async(e: React.FormEvent) =>{
    e.preventDefault();
    try {
      setIsFetching(true);
      const response = await RmaApi.post('/login/userLogin', {email, password: senha});
      if(response.status === 401){
        toast.error(response.data.message)
        setIsFetching(false);
      }
      if(response.status === 200){
        const { token} = response.data;
        localStorage.setItem('token', token);
        toast.success("Login realizado com sucesso!")
        navigate("/home")
      }
    } catch(error: unknown){
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || 'Erro da API');
        setIsFetching(false);
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Erro desconhecido');
      }
    };
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
          { isFetching == true ? (
            <input type="submit" value="Carregando..." disabled />
        ) : (<input type="submit" value="Entrar"/>)}
        </form>
      </div>
    </div>
  )
}

export default Login
