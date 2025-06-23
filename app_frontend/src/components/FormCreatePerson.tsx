import axios from "axios"
import RmaApi from "../axios/config"
import {useState} from "react"
import { toast } from "react-toastify"
import { FaRegTimesCircle } from "react-icons/fa"
import classes from "./FormCreatePerson.module.css"

interface Props {
  onSuccess?: () => void;
  personToEdit?:{
    uuid: string;
    name: string;
    email: string;
    client: boolean;
    supplier: boolean;
    observation: string;
  }
}

const FormCreatePerson = ({personToEdit, onSuccess }: Props) => {
  const [name, setName] = useState(personToEdit?.name || '');
  const [email, setEmail] = useState(personToEdit?.email || '');
  const [observation, setObservation] = useState(personToEdit?.observation || '');
  const [isCliente, setIsCliente] = useState(personToEdit?.client || false);
  const [isSupplier, setIsSupplier] = useState(personToEdit?.supplier || false);

  const isEditing = !!personToEdit;

  const resetForm = () => {
    setName('');
    setEmail('');
    setObservation('');
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
        supplier: isSupplier,
        observation: observation
      }

      if(isEditing){
        const res = await RmaApi.put(`/person/update/${personToEdit.uuid}`, person);
        if(res.status === 200){
        resetForm();
        toast.success(res.data.message)
        onSuccess?.();
      }
      }else{
        const res = await RmaApi.post('/person/create', person);
        if(res.status === 201){
        resetForm();
        toast.success(res.data.message)
        onSuccess?.();
      }
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
            <label>
              <span>Observação:</span>
              <textarea value={observation} onChange={(e) => setObservation(e.target.value)}></textarea>
            </label>
            {isEditing ? (<input type="submit" value="Editar"/>) : (<input type="submit" value="Cadastrar"/>) }
          </form>
        </div>
    </div>
  )
}

export default FormCreatePerson