import classes from './Produtos.module.css'
import { useState, useEffect, useRef} from 'react'
import { toast } from 'react-toastify'
import RmaApi from '../axios/config'
import axios from 'axios'
import NavBar from '../components/NavBar'
import FormCreateProduto from '../components/FormCreateProduto'
import { IoIosAddCircle } from "react-icons/io";

const Produtos = () => {

  const [produtos, setProdutos] = useState([])
  const isFetching = useRef(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [createNew, setCreateNew] = useState(false);
  const [productToEdit, setProdutoToEdit] = useState<any | null>(null);

  const loadProdutos = async () =>{
    if (isFetching.current) return;
    isFetching.current = true;

    try {
      const res = await RmaApi.get('/product/getAll');
      if(!res.data){
        toast.error('Nenhum dado encontrado!')
      }
      setProdutos(res.data);
      isFetching.current = false;
    } catch(error: unknown){
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || 'Erro da API');
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Erro desconhecido');
      }
      setTimeout(() => {
        isFetching.current = false;
        loadProdutos();
      }, 15000);
    };
  }

  useEffect(()=>{
    loadProdutos();
  }, []);

  const produtosFiltradas = produtos.filter((produto: any) =>
    produto.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    produto.observation.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className={classes.produtos}>
      <NavBar />
      <div className={classes.produtos_container}>
        <h1>Produtos</h1>
        <div className={classes.pesssoas_create}>
          <h2>Cadastrar Fornecedor ou Cliente.</h2>
          <p>Para cadastrar um novo fornecedor ou cliente, clique no botão abaixo.</p>
          <button className={classes.produto_create_button} onClick={() => setCreateNew(true)}>
          <IoIosAddCircle /> Cadastrar
          </button>
          {createNew && (
          <>
          <FormCreateProduto
            productToEdit={productToEdit}
            onSuccess={() => {
            setCreateNew(false);
            setProdutoToEdit(null);
            loadProdutos(); // atualiza a lista após criação
          }}
          />
          <div id="overlay"></div>
          </>
          )}
        </div>
        <div className={classes.produtos_retorno}>
          <h2>Dados de Fornecedores e Clientes</h2>
          {isFetching.current === true && <div id="loading-screen"><div className="loading-spinner"></div></div>}
          {!produtosFiltradas.length && <p>Não a cadastrados</p>}
          <div className={classes.produtos_search}>
            <input
            type="text"
            placeholder="Pesquisar por nome ou email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}/>
          </div>
          {produtosFiltradas.length > 0 && (
            <table>
            <tr>
              <th>
                Descrição
              </th>
              <th>
                Observação
              </th>
              <th>
                Editar
              </th>
              {/* <th>
                Ver mais
              </th> */}
            </tr>
          {produtosFiltradas.map((produto: any)=>(
            <tr key={produto.uuid} onDoubleClick={
              () =>{
              setProdutoToEdit(produto);
              setCreateNew(true);
              }}>
              <td>{produto.description}</td>
              <td>{produto.observation}</td>
              <td style={{cursor: `pointer`}}><a onClick={() =>{
                setProdutoToEdit(produto);
                setCreateNew(true);
                }}>Editar ✏️</a></td>
              {/* <td>Ver mais</td> */}
            </tr>
          ))}
          </table>
          )}
        </div>
      </div>
    </div>
  )
}

export default Produtos