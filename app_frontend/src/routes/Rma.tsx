import classes from './Rma.module.css'
import NavBar from '../components/NavBar'
import { useNavigate } from "react-router-dom"
import { useState, useEffect, useRef } from 'react'
import { toast } from 'react-toastify'
import RmaApi from '../axios/config'
import axios from 'axios'

interface Produto {
  uuid: string;
  description: string;
}

interface Person {
  uuid: string;
  name: string;
}

const Rma = () => {
  const navigate = useNavigate();
  const [rmaData, setRmaData] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const isFetching = useRef(false);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [person, setPerson] = useState<Person[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([
    "Inicio", "Manutenção", "Protocolo", "Protocolo Manutenção", "Acumulando", "Enviado", "Enviado Manutenção"
  ]);
  const [sortField, setSortField] = useState<'data_start' | 'data_end' | 'cliente' | 'produto' | '' | 'fornecedor'>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const loadRma = async () => {
    if (isFetching.current) return;
    isFetching.current = true;

    try {
      const res = await RmaApi.get('warranty/getAll');
      if (!res.data) toast.error('Nenhum RMA encontrado!');
      setRmaData(res.data);
    } catch (error: unknown) {
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
    } finally {
      isFetching.current = false;
    }
  };

  const loadProdutos = async () => {
    try {
      const res = await RmaApi.get(`product/getAll`);
      if (!res.data) toast.error('Nenhum dado encontrado!');
      setProdutos(res.data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || 'Erro da API');
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Erro desconhecido');
      }
    }
  };

  const loadPessoas = async () => {
    try {
      const res = await RmaApi.get('person/getAll');
      if (!res.data) toast.error('Nenhum dado encontrado!');
      setPerson(res.data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || 'Erro da API');
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Erro desconhecido');
      }
    }
  };

  const formatarData = (dataISO: string): string => {
  const date = new Date(dataISO);
  const somarDias = 0;

  // Cria nova data com os mesmos valores em UTC, mas tratados como locais
  const ano = date.getUTCFullYear();
  const mes = date.getUTCMonth();      // 0-based
  const dia = date.getUTCDate() + somarDias;

  const dataCorrigida = new Date(ano, mes, dia); // Modo local

  return dataCorrigida.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

  const sortRmaList = (list: any[]) => {
    if (!sortField) return list;

    return [...list].sort((a, b) => {
      let aValue: any = a[sortField];
      let bValue: any = b[sortField];

      if (sortField === 'cliente') {
        aValue = person.find(p => p.uuid === a.clientId)?.name || '';
        bValue = person.find(p => p.uuid === b.clientId)?.name || '';
      }

      if (sortField === 'fornecedor') {
        aValue = person.find(p => p.uuid === a.supplierId)?.name || '';
        bValue = person.find(p => p.uuid === b.supplierId)?.name || '';
      }

      if (sortField === 'produto') {
        aValue = produtos.find(p => p.uuid === a.productId)?.description || '';
        bValue = produtos.find(p => p.uuid === b.productId)?.description || '';
      }

      if (sortField.includes('data')) {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      return sortDirection === 'asc'
        ? aValue > bValue ? 1 : -1
        : aValue < bValue ? 1 : -1;
    });
  };

  const filteredAndSortedRma = sortRmaList(
    rmaData.filter((rma: any) => {
      const search = searchTerm.toLowerCase();
      const fornecedor = person.find(p => p.uuid === rma.supplierId)?.name?.toLowerCase() || '';
      const cliente = person.find(p => p.uuid === rma.clientId)?.name?.toLowerCase() || '';
      const produto = produtos.find(p => p.uuid === rma.productId)?.description?.toLowerCase() || '';

      const matchesSearch =
        rma.serial_number?.toLowerCase().includes(search) ||
        fornecedor.includes(search) ||
        cliente.includes(search) ||
        produto.includes(search) ||
        rma.invoice?.toLowerCase().includes(search) ||
        rma.status?.toLowerCase().includes(search) ||
        rma.order_service?.toLowerCase().includes(search);

      const matchesStatus = selectedStatuses.includes(rma.status);

      return matchesSearch && matchesStatus;
    })
  );

  useEffect(() => {
    loadRma();
    loadProdutos();
    loadPessoas();
  }, []);

  return (
    <div className={classes.rma}>
      <NavBar />
      <div className={classes.rma_container}>
        <h1>RMA</h1>
        <div className={classes.rma_create}>
          <h2>Criação de RMA</h2>
          <p>Para criar um novo RMA, clique no botão abaixo.</p>
          <button onClick={() => navigate('/rma/create')} className={classes.rma_btn_create}>
            Criar Rma
          </button>
        </div>
        <div className={classes.rma_list}>
          <h2>Lista RMA</h2>
          <div className={classes.produtos_search}>
            <input
              type="text"
              placeholder="Pesquisar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div>
              <label style={{color:"#FFF"}}>Status:</label>
              <select multiple value={selectedStatuses} onChange={(e) => {
                const options = Array.from(e.target.selectedOptions, o => o.value);
                setSelectedStatuses(options);
              }}>
                <option value="Inicio">Inicio</option>
                <option value="Manutenção">Manutenção</option>
                <option value="Protocolo">Protocolo</option>
                <option value="Protocolo Manutenção">Protocolo Manutenção</option>
                <option value="Acumulando">Acumulando</option>
                <option value="Enviado">Enviado</option>
                <option value="Enviado Manutenção">Enviado Manutenção</option>
                <option value="Finalizado">Finalizado</option>
                <option value="Finalizado Manutenção">Finalizado Manutenção</option>
                <option value="Sem Garantia">Sem Garantia</option>
              </select>

              <div>
                <label style={{color:"#FFF"}}>Ordenar por:</label>
                <select onChange={(e) => setSortField(e.target.value as any)}>
                  <option value="">Nenhum</option>
                  <option value="data_start">Data Início</option>
                  <option value="data_end">Data Finalização</option>
                  <option value="data_buy">Data Compra</option>
                  <option value="cliente">Cliente</option>
                  <option value="fornecedor">Fornecedor</option>
                  <option value="produto">Produto</option>
                </select>

                <select onChange={(e) => setSortDirection(e.target.value as any)}>
                  <option value="asc">Crescente</option>
                  <option value="desc">Decrescente</option>
                </select>
              </div>
              
            </div>
          </div>
          {isFetching.current && <div id="loading-screen"><div className="loading-spinner"></div></div>}
          {!filteredAndSortedRma.length && <p>Não há registros cadastrados</p>}
          {filteredAndSortedRma.length > 0 && (
            <table>
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Produto</th>
                  <th>Data Início</th>
                  <th>Finalização</th>
                  <th>Loja</th>
                  <th>Fornecedor</th>
                  <th>Cliente</th>
                  <th>Nota</th>
                  <th>Compra</th>
                  <th>Status</th>
                  <th>OS</th>
                  <th>Editar</th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedRma.map((rma: any) => (
                  <tr key={rma.uuid} onDoubleClickCapture={() => navigate(`/rma/create/${rma.uuid}`)}>
                    <td>{rma.description}</td>
                    <td>{produtos.find(p => p.uuid === rma.productId)?.description || 'Produto não encontrado'}</td>
                    <td>{formatarData(rma.data_start)}</td>
                    <td>{rma.data_end === null ? "Não definido" : formatarData(rma.data_end)}</td>
                    <td>{rma.client_prod === false ? "❌" : "✅"}</td>
                    <td>{person.find(p => p.uuid === rma.supplierId)?.name || "Fornecedor não encontrado"}</td>
                    <td>{person.find(p => p.uuid === rma.clientId)?.name || "Cliente não encontrado"}</td>
                    <td>{rma.invoice}</td>
                    <td>{rma.data_buy ? formatarData(rma.data_buy) : 'Não definido'}</td>
                    <td>
                      <span style={{ color: 
                        rma.status.includes("Finalizado") ? "#28a745" :
                        rma.status.includes("Sem Garantia") ? "#FF6347 " :
                        rma.status.includes("Manutenção") ? "#007bff" :
                        rma.status.includes("Protocolo") ? "#fd7e14" :
                        rma.status === "Acumulando" ? "#FFFF00" :
                        rma.status.includes("Enviado") ? "#20c997" :
                        rma.status.includes("Sem Garantia") ? "#dc3545" :
                        "#FFF"
                      }}>
                        {rma.status}
                      </span>
                    </td>
                    <td>{rma.order_service}</td>
                    <td style={{ cursor: "pointer" }} onClick={() => navigate(`/rma/create/${rma.uuid}`)}>✏️</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Rma;
