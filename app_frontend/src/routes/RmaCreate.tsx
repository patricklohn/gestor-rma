import NavBar from '../components/NavBar'
import classes from './RmaCreate.module.css'
import { useEffect, useState, useRef} from 'react'
import { toast } from 'react-toastify'
import RmaApi from '../axios/config'
import axios from 'axios'
import { useNavigate, useParams} from 'react-router-dom'

interface Rma {
    uuid: string;
    description: string;
    serial_number: string;
    change_sn: string;
    data_start: string;
    data_end: string;
    data_buy: string;
    productId: string;
    supplierId: string;
    clientId: string;
    invoice: string;
    invoice_arq: string;
    change_inv: string;
    invoice_arq_change: string;
    client_prod: string;
    status: string;
    defect: string; 
    notes: string;
    order_service: string; 
    createdAt: string;
    updatedAt: string;
}

interface Produto {
    uuid: string;
    description: string;
    // adicione outros campos se precisar
}

interface Person {
    uuid: string;
    name: string;
    // adicione outros campos se precisar
}

const RmaCreate = () => {
    const navigate = useNavigate();
    const {uuid} = useParams();
    const [rma, setRma] = useState<Rma | null>(null)
  return (
    <div className={classes.rmaCreate}>
      <NavBar/>
        <div className={classes.rmaCreate_container}>
            {uuid ? (<h1>Edição de RMA</h1>) : (<h1>Criação de RMA</h1>)}
            <div className={classes.rmaCrate_form}>
                <form onSubmit={(e) => {e.preventDefault(); console.log("teste") }}>
                    <label>
                        <span>Descrição</span>
                        <input type="text" required value={rma?.description}/>
                    </label>
                    {uuid ? <input type="submit" value="Salvar"/> : <input type="submit" value="Criar" />}
                </form>
            </div>
        </div>
    </div>
  )
}

export default RmaCreate