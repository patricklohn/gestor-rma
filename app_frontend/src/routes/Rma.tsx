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
interface Person {
  uuid: string;
  name: string;
  // adicione outros campos se precisar
}


const Rma = () => {
  const navigate = useNavigate();
  const [rmaData, setRmaData] = useState([])
  const [searchTerm, setSearchTerm] = useState('');
  const isFetching = useRef(false);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [person, setPerson] = useState<Person[]>([]);
  
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

  const loadPessoas = async () =>{

    try {
      const res = await RmaApi.get('person/getAll');
      if(!res.data){
        toast.error('Nenhum dado encontrado!')
      }
      setPerson(res.data);
    } catch(error: unknown){
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || 'Erro da API');
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Erro desconhecido');
      }
  }
  }

  const formatarData = (data: string) =>{
    const dataFormatada = 
      new Date(data).toLocaleString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      // hour: '2-digit',
      // minute: '2-digit',
    });
    return dataFormatada 
  }

  useEffect(()=>{
    loadRma();
    loadProdutos();
    loadPessoas();
  }, []);

  const filterRma = rmaData.filter((rma: any) => {
    const search = searchTerm.toLowerCase();
  
    const fornecedor = person.find((p) => p.uuid === rma.supplierId)?.name?.toLowerCase() || '';
    const cliente = person.find((p) => p.uuid === rma.clientId)?.name?.toLowerCase() || '';
    const produto = produtos.find((p) => p.uuid === rma.productId)?.description?.toLowerCase() || '';
  
    return (
      rma.serial_number?.toLowerCase().includes(search) ||
      fornecedor.includes(search) ||
      cliente.includes(search) ||
      produto.includes(search) ||
      rma.invoice?.toLowerCase().includes(search) ||
      rma.status?.toLowerCase().includes(search) ||
      rma.order_service?.toLowerCase().includes(search)
    );
  });

  return (
    <div className={classes.rma}>
      <NavBar/>
      <div className={classes.rma_container}>
        <h1>Rma</h1>
        <div className={classes.rma_create}>
          <h2>Criação de RMA</h2>
          <p>Para criar um novo RMA, clique no botão abaixo.</p>
          <button onClick={() => navigate('/rma/create')} className={classes.rma_btn_create}>
            Criar Rma
          </button>
        </div>
        <div className={classes.rma_list}>
          <h2>Lista Rma</h2>
          {isFetching.current === true && <div id="loading-screen"><div className="loading-spinner"></div></div>}
          {!filterRma.length && <p>Não a cadastrados</p>}
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
              <th>Codigo</th>
              <th>Produto</th>
              <th>Data Inicio</th>
              <th>Data Finalização</th>
              <th>Produto de loja</th>
              <th>Fornecedor</th>
              <th>Cliente</th>
              <th>Nota</th>
              <th>Data de Compra</th>
              <th>Status</th>
              <th>Ordem de serviço</th>
              <th>Editar</th>
            </tr>
            {filterRma.map((rma: any)=>(
              <tr key={rma.uuid} onDoubleClickCapture={() => navigate(`/rma/create/${rma.uuid}`)}>
                <th>{rma.description}</th>
                <th>{produtos.find((p) => p.uuid === rma.productId)?.description || 'Produto não encontrado'}</th>
                <th>{formatarData(rma.data_start)}</th>
                <th>{rma.data_end === null ? "Não definido" : formatarData(rma.data_start)}</th>
                <th>{rma.client_prod === false ? "❌" : "✅"}</th>
                <th>{person.find((p) => p.uuid === rma.supplierId)?.name || "Fornecedor não encotrado"}</th>
                <th>{person.find((p) => p.uuid === rma.clientId)?.name || "Cliente não encotrado"}</th>
                <th>{rma.invoice}</th>
                <th>{rma.data_buy ? formatarData(rma.data_buy) : 'Não definido'}</th>
                <th>{rma.status}</th>
                <th>{rma.order_service}</th>
                <th style={{cursor: "pointer"}} onClick={() => navigate(`/rma/create/${rma.uuid}`)}>✏️</th>
              </tr>
            ))}
          </table>
        )}
        </div>
      </div>
    </div>
  )
}

export default Rma