import classes from './Rma.module.css'
import NavBar from '../components/NavBar'
import {useNavigate} from "react-router-dom"
import { useState, useEffect, useRef} from 'react'
import { toast } from 'react-toastify'
import RmaApi from '../axios/config'
import axios from 'axios'

interface Produto {
  uuid: string;
  description: string;
  // adicione outros campos se precisar
}

const Rma = () => {
  const navigate = useNavigate();
  const [rmaData, setRmaData] = useState([])
  const [searchTerm, setSearchTerm] = useState('');
  const isFetching = useRef(false);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  
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

  const loadProdutos = async () =>{
    try {
      const res = await RmaApi.get(`product/getAll`);
      if(!res.data){
        toast.error('Nenhum dado encontrado!')
      }
      setProdutos(res.data);
    } catch(error: unknown){
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || 'Erro da API');
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Erro desconhecido');
      }
    };
  }

  const formatarData = (data: string) =>{
    const dataFormatada = 
      new Date(data).toLocaleString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
    return dataFormatada 
  }

  useEffect(()=>{
    loadRma();
    loadProdutos();
  }, []);

  const filterRma = rmaData.filter((rma: any) =>
    rma.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rma.serial_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rma.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rma.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rma.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rma.invoice.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rma.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rma.order_service.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
              <th>Produto</th>
              <th>Data Inicio</th>
              <th>Data Finalização</th>
              <th>Produto de loja</th>
              <th>Fornecedor</th>
              <th>Cliente</th>
              <th>Nota</th>
              <th>Cliente</th>
              <th>Status</th>
              <th>Ordem de serviço</th>
            </tr>
            {filterRma.map((rma: any)=>(
              <tr key={rma.uuid}>
                <td>{rma.description}</td>
                <td>{produtos.find((p) => p.uuid === rma.productId)?.description || 'Produto ão encontrado'}</td>
                <td>{formatarData(rma.data_start)}</td>
                <td>{rma.data_end}</td>
                <td>{rma.client_prod}</td>
                <td>{rma.supplier}</td>
                <td>{rma.client}</td>
                <td>{rma.status}</td>
                <td>{rma.order_service}</td>
              </tr>
            ))}
          </table>
        )}
      </div>
    </div>
  )
}

export default Rma