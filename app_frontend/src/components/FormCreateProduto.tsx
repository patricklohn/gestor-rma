import classes from './FormCreateProduto.module.css'
import axios from "axios"
import RmaApi from "../axios/config"
import {useState} from "react"
import { toast } from "react-toastify"
import { FaRegTimesCircle } from "react-icons/fa"

interface Props {
  onSuccess?: () => void;
  productToEdit?:{
    uuid: string;
    description: string;
    observation: string;
  }
}

const FormCreateProduto = ({productToEdit, onSuccess }: Props) => {
    const [description, setDescription] = useState(productToEdit?.description || '');
    const [observation, setObservation] = useState(productToEdit?.observation || '');
    const isEditing = !!productToEdit;
  
    const resetForm = () => {
      setDescription('');
      setObservation('');
    };
  
    const createProduct = async (e: React.FormEvent) =>{
      e.preventDefault();
  
      try {
        const product = {
          description,
          observation,
        }
  
        if(isEditing){
          const res = await RmaApi.put(`/product/update/${productToEdit.uuid}`, product);
          if(res.status === 200){
          resetForm();
          toast.success(res.data.message)
          onSuccess?.();
        }
        }else{
          const res = await RmaApi.post('/product/create', product);
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
    <div className={classes.formProduct_container}>
        <button onClick={() => onSuccess?.()}>
        <FaRegTimesCircle/>
        </button>
        <h1>Prencha as informações:</h1>
        <div className={classes.formProduct_form}>
          <form onSubmit={createProduct}>
            <label>
              <span>Descrição</span>
              <input type="text" value={description} onChange={(e) => setDescription(e.target.value)}/>
            </label>
            <label>
              <span>Observação</span>
              <input type="text" value={observation} onChange={(e) => setObservation(e.target.value)}/>
            </label>
            {isEditing ? (<input type="submit" value="Editar"/>) : (<input type="submit" value="Cadastrar"/>) }
          </form>
        </div>
    </div>
  )
}

export default FormCreateProduto