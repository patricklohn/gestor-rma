import axios from "axios"
import RmaApi from "../axios/config"
import {useState} from "react"
import { toast } from "react-toastify"
import { FaRegTimesCircle } from "react-icons/fa"
import classes from "./FormCreatePerson.module.css"

interface Props {
  onSuccess?: () => void;
}

const FormCreatePerson = ({ onSuccess }: Props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isCliente, setIsCliente] = useState(false);
  const [isSupplier, setIsSupplier] = useState(false);

  const resetForm = () => {
    setName('');
    setEmail('');
    setIsCliente(false);
    setIsSupplier(false);
  };

  const createPerson = async (e: React.FormEvent) =>{
    e.preventDefault();

    try {
      const person = {
        name: name,
        email: email,
        client: isCliente,
        supplier: isSupplier
      }

      const res = await RmaApi.post('/person/create', person);
      if(res.status === 201){
        resetForm();
        toast.success(res.data.message)
        onSuccess?.();
      }
      
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data?.message || 'Erro da API')
      } else if (error instanceof Error) {
        console.error(error.message)
      } else {
        console.error('Erro desconhecido')
      }
      
    }
  }
  


  return (
    <div className={classes.formPerson_container}>
        <button onClick={() => onSuccess?.()}>
        <FaRegTimesCircle/>
        </button>
        <h1>Prencha as informações:</h1>
        <div className={classes.formPerson_form}>
          <form onSubmit={createPerson}>
            <label>
              <span>Nome:</span>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
            </label>
            <label>
              <span>Email:</span>
              <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </label>
            <div>
              <label>
                <span>Cliente:</span>
                <input type="checkbox" checked={isCliente}  onChange={(e) => setIsCliente(e.target.checked)}/>
              </label>
              <label>
                <span>Fornecedor:</span>
                <input type="checkbox" checked={isSupplier} onChange={(e) => setIsSupplier(e.target.checked)}/>
              </label>
            </div>
            <input type="submit" value="Enviar"/>
          </form>
        </div>
    </div>
  )
}

export default FormCreatePerson