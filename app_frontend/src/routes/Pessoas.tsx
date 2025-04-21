import { useState, useEffect, useRef} from 'react'
import { toast } from 'react-toastify'
import RmaApi from '../axios/config'
import axios from 'axios'
import classes from './Pessoas.module.css'
import NavBar from '../components/NavBar'
import FormCreatePerson from '../components/FormCreatePerson'
import { FaUserPlus } from "react-icons/fa";

const Pessoas = () => {
  const [pessoas, setPessoas] = useState([])
  const isFetching = useRef(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [createNew, setCreateNew] = useState(false);

  const loadPessoas = async () =>{
    if (isFetching.current) return;
    isFetching.current = true;

    try {
      const res = await RmaApi.get('/person/getAll');
      if(!res.data){
        toast.error('Nenhum dado encontrado!')
      }
      setPessoas(res.data);
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
        loadPessoas();
      }, 15000);
    };
  }

  useEffect(()=>{
    loadPessoas();
  }, []);

  const pessoasFiltradas = pessoas.filter((pessoa: any) =>
    pessoa.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pessoa.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className={classes.pessoas}>
      <NavBar />
      <div className={classes.pessoas_container}>
        <h1>Pessoas</h1>
        <div className={classes.pesssoas_create}>
          <h2>Cadastrar Fornecedor ou Cliente.</h2>
          <p>Para cadastrar um novo fornecedor ou cliente, clique no botão abaixo.</p>
          <button className={classes.pesssoas_create_button} onClick={() => setCreateNew(true)}>
          <FaUserPlus /> Cadastrar
          </button>
          {createNew && (
          <>
          <FormCreatePerson
            onSuccess={() => {
            setCreateNew(false);
            loadPessoas(); // atualiza a lista após criação
          }}
          />
          <div id="overlay"></div>
          </>
          )}
        </div>
        <div className={classes.pessoas_retorno}>
          <h2>Dados de Fornecedores e Clientes</h2>
          {isFetching.current === true && <div id="loading-screen"><div className="loading-spinner"></div></div>}
          {!pessoasFiltradas.length && <p>Não a cadastrados</p>}
          <div className={classes.pessoas_search}>
            <input
            type="text"
            placeholder="Pesquisar por nome ou email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}/>
          </div>
          {pessoasFiltradas.length > 0 && (
            <table>
            <tr>
              <th>
                Nome
              </th>
              <th>
                Cliente
              </th>
              <th>
                Fornecedor
              </th>
              <th>
                Email
              </th>
              <th>
                Editar
              </th>
              {/* <th>
                Ver mais
              </th> */}
            </tr>
          {pessoasFiltradas.map((pessoa: any)=>(
            <tr key={pessoa.uuid}>
              <td>{pessoa.name}</td>
              <td>{pessoa.client ? '✅' : '❌'}</td>
              <td>{pessoa.supplier ? '✅' : '❌'}</td>
              <td>{pessoa.email}</td>
              <td>Editar</td>
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

export default Pessoas