import classes from './Rma.module.css'
import NavBar from '../components/NavBar'
import {useNavigate} from "react-router-dom"
import { useState, useEffect, useRef} from 'react'
import { toast } from 'react-toastify'
import RmaApi from '../axios/config'
import axios from 'axios'

const Rma = () => {
  const navigate = useNavigate();
  const [rmaData, setRmaData] = useState([])
  const [searchTerm, setSearchTerm] = useState('');
  const isFetching = useRef(false);
  
  const loadRma = async () =>{
    if (isFetching.current) return;
    isFetching.current = true;
    
    try {
      const res = await RmaApi.get('warranty/getAll');
      if(!res.data){
        toast.error('Nenhum RMA encontrado!')
      }
      setRmaData(res.data);
      isFetching.current = false;
    } catch (error: unknown){
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || 'Erro da API');
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Erro desconhecido');
      }
      setTimeout(() => {
        isFetching.current = false;
        loadRma();
      }, 15000);
    };
  }

  useEffect(()=>{
    loadRma();
  }, []);

  const filterRma = rmaData.filter((rma: any) =>{
    rma.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rma.serial_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rma.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rma.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rma.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rma.invoice.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rma.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rma.order_service.toLowerCase().includes(searchTerm.toLowerCase())
  })

  return (
    <div className={classes.rma}>
      <NavBar/>
      <div className={classes.rma_container}>
        <h1>Rma</h1>
        <div className={classes.rma_create}>
          <h2>Criação de RMA</h2>
          <p>Para criar um novo RMA, clique no botão abaixo.</p>
          <button onClick={() => navigate('#')} className={classes.rma_btn_create}>
            Criar Rma
          </button>
        </div>
        <div className={classes.rma_list}>
          <h2>Lista Rma</h2>
          {isFetching.current === true && <div id="loading-screen"><div className="loading-spinner"></div></div>}
          {!filterRma.length && <p>Não a cadastrados</p>}
        </div>
        <div className={classes.produtos_search}>
            <input
            type="text"
            placeholder="Pesquisar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}/>
        </div>
        {filterRma.length > 0 && (
          <table>
            <tr>
              <th>Descrição</th>
              <th>Data Inicio</th>
              <th>Data Finalização</th>
              <th>Produto de loja</th>
              <th>Fornecedor</th>
              <th>Cliente</th>
            </tr>
          </table>
        )}
      </div>
    </div>
  )
}

export default Rma