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
    const emptyRma: Rma = {
        uuid: '',
        description: '',
        serial_number: '',
        change_sn: '',
        data_start: '',
        data_end: '',
        data_buy: '',
        productId: '',
        supplierId: '',
        clientId: '',
        invoice: '',
        invoice_arq: '',
        change_inv: '',
        invoice_arq_change: '',
        client_prod: '',
        status: '',
        defect: '',
        notes: '',
        order_service: '',
        createdAt: '',
        updatedAt: '',
      };
    const [rma, setRma] = useState<Rma>(emptyRma)
  return (
    <div className={classes.rmaCreate}>
      <NavBar/>
        <div className={classes.rmaCreate_container}>
            {uuid ? (<h1>Edição de RMA</h1>) : (<h1>Criação de RMA</h1>)}
            <div className={classes.rmaCrate_form}>
                <form onSubmit={(e) => {e.preventDefault(); console.log("teste") }}>
                    <label>
                        <span>Descrição:</span>
                        <input type="text" required value={rma?.description || ""} onChange={(e) => {if(rma) {setRma({ ...rma, description: e.target.value });}}}/>
                    </label>
                    <label>
                        <span>Numero de Serie:</span>
                        <input type="text" value={rma?.serial_number || ""} onChange={(e) => {if(rma) {setRma({ ...rma, serial_number: e.target.value });}}}/>
                    </label>
                    <label>
                        <span>Numero de Serie novo:</span>
                        <input type="text" required value={rma?.change_sn || ""} onChange={(e) => {if(rma) {setRma({ ...rma, change_sn: e.target.value });}}}/>
                    </label>
                    <label>
                        <span>Data de compra</span>
                        <input type="date" required value={rma?.data_buy ? rma.data_buy.slice(0,10) : ""}  onChange={(e) => {if(rma) {setRma({ ...rma, data_buy: e.target.value });}}}/>
                    </label>
                    <label>
                        <span>Nota da empresa:</span>
                        <input type="text" required value={rma?.invoice || ""} onChange={(e) => {if(rma) {setRma({ ...rma, invoice: e.target.value });}}}/>
                    </label>
                    <label>
                        <span>Nota de retorno:</span>
                        <input type="text" required value={rma?.change_inv || ""} onChange={(e) => {if(rma) {setRma({ ...rma, change_inv: e.target.value });}}}/>
                    </label>
                    <label>
                        <span>Produto de cliente:</span>
                        <input type="text" required value={rma?.client_prod || ""} onChange={(e) => {if(rma) {setRma({ ...rma, client_prod: e.target.value });}}}/>
                    </label>
                    <label>
                        <span>Defeito:</span>
                        <input type="text" required value={rma?.change_sn || ""} onChange={(e) => {if(rma) {setRma({ ...rma, change_sn: e.target.value });}}}/>
                    </label>
                    <label>
                        <span>Notas:</span>
                        <input type="text" required value={rma?.change_sn || ""} onChange={(e) => {if(rma) {setRma({ ...rma, change_sn: e.target.value });}}}/>
                    </label>
                    <label>
                        <span>Ordem de serviço:</span>
                        <input type="text" required value={rma?.change_sn || ""} onChange={(e) => {if(rma) {setRma({ ...rma, change_sn: e.target.value });}}}/>
                    </label>
                    {uuid ? <input type="submit" value="Salvar"/> : <input type="submit" value="Criar" />}
                </form>
            </div>
        </div>
    </div>
  )
}

export default RmaCreate