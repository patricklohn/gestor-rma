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
    const [searchProd, setSearchProd] = useState<string>("");
    const [suggestionsProd, setSuggestionsProd] = useState<Produto[]>([]);
    const [showSuggestionsProd, setShowSuggestionsProd] = useState(false);

    useEffect(() => {
        const delay = setTimeout(() =>{
            if(searchProd.length >= 2){
                RmaApi.get(`product/getDescription/${searchProd}`).then((res)=>{
                    setSuggestionsProd(res.data)
                    setShowSuggestionsProd(true);
                });
            } else {
                setSuggestionsProd([]);
                setShowSuggestionsProd(false);
            }
        }, 300);
        return () => clearTimeout(delay)
    }, [searchProd])

    const handleSelectProd = (prod: Produto) => {
        setSearchProd(prod.description);
        setRma({ ...rma, productId: prod.uuid})
        setShowSuggestionsProd(false);
    }

  return (
    <div className={classes.rmaCreate}>
      <NavBar/>
        <div className={classes.rmaCreate_container}>
            {uuid ? (<h1>Edição de RMA</h1>) : (<h1>Criação de RMA</h1>)}
            <div className={classes.rmaCrate_form}>
                <form onSubmit={(e) => {e.preventDefault(); console.log("teste") }}>
                    <label className={classes.rmaCreate_label_description}>
                        <span>Descrição:</span>
                        <input type="text" required value={rma?.description || ""} onChange={(e) => setRma({ ...rma, serial_number: e.target.value })}/>
                    </label>
                    <label>
                        <span>Produto:</span>
                        <input type="text" value={searchProd} onChange={(e) => setSearchProd(e.target.value)} onFocus={()=> searchProd.length >= 2 && setShowSuggestionsProd(true)} onBlur={() => setTimeout(() => setShowSuggestionsProd(false), 200)} autoComplete='off'/>
                        {showSuggestionsProd && suggestionsProd.length > 0 && (
                           <ul className={classes.suggestionList}>
                           {suggestionsProd.map((prod) => (
                             <li 
                               key={prod.uuid}
                               onClick={() => handleSelectProd(prod)}
                               className={classes.suggestionItem}
                             >
                               {prod.description}
                             </li>
                           ))}
                         </ul>
                        )}
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
                        <input type="text" required value={rma?.defect || ""} onChange={(e) => {if(rma) {setRma({ ...rma, defect: e.target.value });}}}/>
                    </label>
                    <label>
                        <span>Anotações:</span>
                        <input type="text" required value={rma?.notes || ""} onChange={(e) => {if(rma) {setRma({ ...rma, notes: e.target.value });}}}/>
                    </label>
                    <label>
                        <span>Ordem de serviço:</span>
                        <input type="text" required value={rma?.order_service || ""} onChange={(e) => {if(rma) {setRma({ ...rma, order_service: e.target.value });}}}/>
                    </label>
                    {uuid ? <input type="submit" value="Salvar"/> : <input type="submit" value="Criar" />}
                </form>
            </div>
        </div>
    </div>
  )
}

export default RmaCreate