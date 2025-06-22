import NavBar from '../components/NavBar'
import classes from './RmaCreate.module.css'
import { useEffect, useState, useRef } from 'react'
import { toast } from 'react-toastify'
import RmaApi from '../axios/config'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'


interface Rma {
  uuid: string
  description: string
  serial_number: string
  change_sn: string
  data_start: string | null
  data_end: string | null
  data_buy: string | null
  product: string
  supplier: string
  client: string
  productId: string
  supplierId: string
  clientId: string
  invoice: string
  invoice_arq: string
  change_inv: string
  invoice_arq_change: string
  client_prod: boolean
  status: string
  defect: string
  notes: string
  order_service: string
}

interface Produto {
  uuid: string
  description: string
}

interface Person{
    uuid: string
    name: string
    client: boolean
    supplier: boolean
}

const RmaCreate = () => {
  const navigate = useNavigate()
  const { uuid } = useParams()
  const [rmaData, setRmaData] = useState<Rma>();
  const [rma, setRma] = useState<Partial<Rma>>({})

  const [searchProd, setSearchProd] = useState('')
  const [suggestionsProd, setSuggestionsProd] = useState<Produto[]>([])
  const [showSuggestionsProd, setShowSuggestionsProd] = useState(false)
  const [selectedIndex] = useState(0)
  const [showAuthSuggestionsP, setShowAuthSuggestionsP] = useState(true)

  const [searchPerson, setSearchPerson] = useState(''); 
  const [suggestionsPerson, setSuggestionsPerson] = useState<Person[]>([])
  const [showSuggestionsPerson, setShowSuggestionsPerson] = useState(false)
  //const [selectedIndexPerson, setSelectedIndexPerson] = useState(0)
  const [showAuthSuggestionsC, setShowAuthSuggestionsC] = useState(true)

  const [searchPersonSupplier, setSearchPersonSupplier] = useState('');
  const [suggestionsPersonSupplier, setSuggestionsPersonSupplier] = useState<Person[]>([])
  const [showSuggestionsPersonSupplier, setShowSuggestionsPersonSupplier] = useState(false) 
  //const [selectedIndexPersonSupplier, setSelectedIndexPersonSupplier] = useState(0)
  const [showAuthSuggestionsS, setShowAuthSuggestionsS] = useState(true)

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  //const [file, setFile] = useState<File | null>(null)
  const blockSearch = useRef(false)

  const getDataAtualForm = () =>{
    const hoje = new Date();
    const ano = String(hoje.getFullYear());
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const dia = String(hoje.getDate()).padStart(2,'0');

    return `${ano}-${mes}-${dia}T00:00:00.000Z`
  }

  const buscaRma = async (uuid:string) => {
    try {
        const res = await RmaApi.get(`warranty/getId/${uuid}`);
        if(!res.data[0]){0
          toast.error('Nenhum dado encontrado!')
        }
        setRmaData(res.data[0]); 
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data?.message || 'Erro da API')
        toast.error(error.response?.data?.message || 'Erro da API')
      } else if (error instanceof Error) {
        console.error(error.message)
        toast.error(error instanceof Error)
      } else {
        console.error('Erro desconhecido')
        toast.error('Erro desconhecido')
      }
    }
  }
  
  useEffect(() => {// BUSCA PRODUTO
    if (blockSearch.current) {
      blockSearch.current = false
      return
    }
    const delay = setTimeout(() => {
      if (searchProd.length >= 2) {
        RmaApi.get(`product/getDescription/${searchProd}`).then((res) => {
          setSuggestionsProd(res.data)
          setShowSuggestionsProd(true)
        })
      } else {
        setSuggestionsProd([])
        setShowSuggestionsProd(false)
      }
    }, 300)
    return () => clearTimeout(delay)
  }, [searchProd])

  useEffect(() =>{//BUSCA CLIENTE
    if (blockSearch.current) {
      blockSearch.current = false
      return
    }
    const delay = setTimeout(() => {
      if (searchPerson.length >= 2) {
        RmaApi.get(`person/getName/${searchPerson}`).then((res) => {
          setSuggestionsPerson(res.data)
          setShowSuggestionsPerson(true)
        })
      } else {
        setSuggestionsPerson([])
        setShowSuggestionsPerson(false)
      }
    }, 300)
    return () => clearTimeout(delay)
  }, [searchPerson])

  useEffect(() =>{//BUSCA FORNECEDOR
    if (blockSearch.current) {
      blockSearch.current = false
      return
    }
    const delay = setTimeout(() => {
      if (searchPersonSupplier.length >= 2) {
        RmaApi.get(`person/getName/${searchPersonSupplier}`).then((res) => {
          setSuggestionsPersonSupplier(res.data)
          setShowSuggestionsPersonSupplier(true)
        })
      } else {
        setSuggestionsPersonSupplier([])
        setShowSuggestionsPersonSupplier(false)
      }
    }, 300)
    return () => clearTimeout(delay)
  }, [searchPersonSupplier])

  useEffect(() => {//BUSCA RMA EDIÇÃO
    if (uuid) {
      buscaRma(uuid)
    }
  }, [uuid])

  useEffect(() => {
    console.log(rmaData)
      if(rmaData && Object.keys(rmaData).length > 0){
        setRma({
          uuid: rmaData.uuid || '',
          description: rmaData.description || '',
          serial_number: rmaData.serial_number || '',
          change_sn: rmaData.change_sn || '',
          data_start: rmaData.data_start ? rmaData.data_start.slice(0, 10) : null,
          data_end: rmaData.data_end ? rmaData.data_end.slice(0, 10) : null,
          data_buy: rmaData.data_buy ? rmaData.data_buy.slice(0, 10) : null,
          product: rmaData?.productId || "",
          supplier: rmaData?.supplierId || "",
          client: rmaData?.clientId || "",
          invoice: rmaData.invoice || "",
          invoice_arq: rmaData.invoice_arq || "",
          change_inv: rmaData.change_inv || "",
          invoice_arq_change: rmaData.invoice_arq_change || "",
          client_prod: rmaData.client_prod || false,
          status: rmaData.status || 'Inicio',
          defect: rmaData.defect || '',
          notes: rmaData.notes || '',
          order_service: rmaData.order_service || '',
        })
        // Preencher os campos de busca
    if (rmaData.productId) {
      RmaApi.get(`product/getId/${rmaData.productId}`).then((res) => {
        setSearchProd(res.data[0].description);
        setShowAuthSuggestionsP(false)
      });
    }
    
    if (rmaData.clientId) {
      RmaApi.get(`person/getId/${rmaData.clientId}`).then((res) => {
        setSearchPerson(res.data[0].name);
        setShowAuthSuggestionsC(false)
      });
    }
    
    if (rmaData.supplierId) {
      RmaApi.get(`person/getId/${rmaData.supplierId}`).then((res) => {
        setSearchPersonSupplier(res.data[0].name);
        setShowAuthSuggestionsS(false)
      });
    }
  }
  },[rmaData])

  const handleSelectProd = (prod: Produto) => {
    blockSearch.current = true
    setSearchProd(prod.description)
    setRma({ ...rma, product: prod.uuid })
    setShowSuggestionsProd(false)
  }

  const handleSelectClient = (person: Person) =>{
    blockSearch.current = true
    setSearchPerson(person.name)
    setRma({ ...rma, client: person.uuid})
    setShowSuggestionsPerson(false);
  }

  const handleSelectSupplier = (person: Person) =>{
    blockSearch.current = true
    setSearchPersonSupplier(person.name)
    setRma({ ...rma, supplier: person.uuid})
    setShowSuggestionsPersonSupplier(false);
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files) || null;
      setSelectedFiles((prev) => [...prev, ...filesArray]);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // if (!rma.description || !rma.product || !rma.client || !rma.supplier) {
    //   toast.error("Preencha todos os campos obrigatórios!")
    //   return
    // }
    const formData = new FormData()
    selectedFiles.forEach((file) => {
    formData.append("files", file); // "files" como array
  });
    try {
      if(uuid){
        const date: string = uuid ? rma.data_start + "T00:00:00.000Z" : getDataAtualForm();
        const dateBuy: string | null = rma.data_buy ? rma.data_buy + "T00:00:00.000Z" : null;
        let dataEnd: string | null = null;
        if (rma.status === 'Finalizado Manutenção' || rma.status === 'Finalizado' || rma.status === 'Sem Garantia') {
          dataEnd= rma.data_end ? rma.data_end + "T00:00:00.000Z" : getDataAtualForm();
          rma.data_end = dataEnd;
        }
        const rmaNew  = {...rma, data_start: date, data_buy: dateBuy, data_end: dataEnd};
        const res = await RmaApi.put(`/warranty/update/${uuid}`, rmaNew);

        if(res.status === 201){
        toast.success(res.data.message || "Atualizado com sucesso")
        navigate("/rma")
        }
      }else{
        const statusInicio: string = rma.status || 'Inicio'; 
        const date: string = uuid ? rma.data_start + "T00:00:00.000Z" : getDataAtualForm();
        const dateBuy: string | null = rma.data_buy ? rma.data_buy + "T00:00:00.000Z" : null;
        let dataEnd: string | null = null;
        if (rma.status === 'Finalizado Manutenção' || rma.status === 'Finalizado' || rma.status === 'Finalizado Sem Garantia') {
          dataEnd= rma.data_end ? rma.data_end + "T00:00:00.000Z" : getDataAtualForm();
          rma.data_end = dataEnd;
        }
        const rmaNew  = {...rma, data_start: date, data_buy: dateBuy, status: statusInicio, data_end: dataEnd};
        const res = await RmaApi.post(`/warranty/create`, rmaNew);
        if(res.status === 201){
        toast.success(res.data.message)
        navigate("/rma")
        }
        }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data?.message || 'Erro da API')
        toast.error(error.response?.data?.message || 'Erro da API')
      } else if (error instanceof Error) {
        console.error(error.message)
        toast.error(error instanceof Error)
      } else {
        console.error('Erro desconhecido')
        toast.error('Erro desconhecido')
      }
    }
    }

  return (
    <div className={classes.rmaCreate}>
      <NavBar />
      <div className={classes.rmaCreate_container}>
        <h1>{uuid ? 'Editar RMA' : 'Criar RMA'}</h1>
        <form className={classes.form} onSubmit={handleSubmit}>
          <div className={classes.grid}>
            <label>
              <span>° Descrição:</span>
              <input
                type="text"
                required
                value={rma.description || ""}
                onChange={(e) => setRma({ ...rma, description: e.target.value })}
              />
            </label>

            <label>
              <span>Produto:</span>
              <input
                type="text"
                value={searchProd}
                onChange={
                  (e) => {
                    setSearchProd(e.target.value)
                    setShowAuthSuggestionsP(true)
                  }
                }
                onFocus={() => searchProd.length >= 2 && setShowSuggestionsProd(true)}
                onBlur={() => setTimeout(() => setShowSuggestionsProd(false), 200)}
                autoComplete="off"
              />
              {showSuggestionsProd && suggestionsProd.length > 0 && showAuthSuggestionsP && (
                <ul className={classes.suggestionList}>
                  {suggestionsProd.map((prod, index) => (
                    <li
                      key={prod.uuid}
                      onClick={() => handleSelectProd(prod)}
                      className={index === selectedIndex ? classes.selectedItem : ''}
                    >
                      {prod.description}
                    </li>
                  ))}
                </ul>
              )}
            </label>

            <label>
              <span>Número de Série:</span>
              <input
                type="text"
                value={rma.serial_number}
                onChange={(e) => setRma({ ...rma, serial_number: e.target.value })}
              />
            </label>

            <label>
              <span>Novo Nº de Série:</span>
              <input
                type="text"
                value={rma.change_sn}
                onChange={(e) => setRma({ ...rma, change_sn: e.target.value })}
              />
            </label>

            <label>
                <span>° Status</span>
                <select id='opcoes' value={rma?.status} onChange={(e)=> setRma({...rma, status: e.target.value})}>
                    <option value="Inicio">Inicio</option>
                    <option value="Manutenção">Manutenção</option>
                    <option value="Protocolo">Protocolo</option>
                    <option value="Protocolo Manutenção">Protocolo Manutenção</option>
                    <option value="Acumulando">Acumulando</option>
                    <option value="Enviado">Enviado</option>
                    <option value="Enviado Manutenção">Enviado Manutenção</option>
                    <option value="Sem Garantia">Sem Garantia</option>
                    <option value="Finalizado">Finalizado</option>
                    <option value="Finalizado Manutenção">Finalizado Manutenção</option>
                </select>
            </label>

            <label>
              <span>Data da Compra:</span>
              <input
                type="date"
                value={rma.data_buy?.slice(0, 10)}
                onChange={(e) => setRma({ ...rma, data_buy: e.target.value})}
              />
            </label>

            <label>
              <span>Produto de loja:</span>
              <input
                type="checkbox"
                checked={rma.client_prod}
                onChange={(e) => setRma({ ...rma, client_prod: e.target.checked ? true : false })}
              />
            </label>

            <label>
              <span>° Defeito:</span>
              <input
                required
                type="text"
                value={rma.defect}
                onChange={(e) => setRma({ ...rma, defect: e.target.value })}
              />
            </label>

            <label>
              <span>Nota Fiscal:</span>
              <input
                type="text"
                value={rma.invoice}
                onChange={(e) => setRma({ ...rma, invoice: e.target.value })}
              />
            </label>

            <label>
              <span>Nota de Retorno:</span>
              <input
                type="text"
                value={rma.change_inv}
                onChange={(e) => setRma({ ...rma, change_inv: e.target.value })}
              />
            </label>

            <label>
              <span>Ordem de Serviço:</span>
              <input
                type="text"
                value={rma.order_service}
                onChange={(e) => setRma({ ...rma, order_service: e.target.value })}
              />
            </label>

            <label>
              <span>Cliente:</span>
              <input
                type="text"
                value={searchPerson}
                onChange={(e) => {
                  setSearchPerson(e.target.value)
                  setShowAuthSuggestionsC(true)
                }}
                onFocus={() => searchPerson.length >= 2 && setShowSuggestionsPerson(true)}
                onBlur={() => setTimeout(() => setShowSuggestionsPerson(false), 200)}
                autoComplete="off"
              />
              {showSuggestionsPerson && suggestionsPerson.length > 0 && showAuthSuggestionsC && (
                <ul className={classes.suggestionList}>
                  {suggestionsPerson.filter(person => person.client).map((person, index) => (
                    <li
                      key={person.uuid}
                      onClick={() => handleSelectClient(person)}
                      className={index === selectedIndex ? classes.selectedItem : ''}
                    >
                      {person.name}
                    </li>
                  ))}
                </ul>
              )}
            </label>

            <label>
              <span>Fornecedor:</span>
              <input
                type="text"
                value={searchPersonSupplier}
                onChange={
                  (e) => {
                    setSearchPersonSupplier(e.target.value)
                    setShowAuthSuggestionsS(true)
                  }}
                onFocus={() => searchPersonSupplier.length >= 2 && setShowSuggestionsPersonSupplier(true)}
                onBlur={() => setTimeout(() => setShowSuggestionsPersonSupplier(false), 200)}
                autoComplete="off"
              />
              {showSuggestionsPersonSupplier && suggestionsPersonSupplier.length > 0 && showAuthSuggestionsS && (
                <ul className={classes.suggestionList}>
                  {suggestionsPersonSupplier.filter(person => person.supplier).map((person, index) => (
                    <li
                      key={person.uuid}
                      onClick={() => handleSelectSupplier(person)}
                      className={index === selectedIndex ? classes.selectedItem : ''}
                    >
                      {person.name}
                    </li>
                  ))}
                </ul>
              )}
            </label>

            <label>
              <span>Anotações:</span>
              <input
                type="text"
                value={rma.notes}
                onChange={(e) => setRma({ ...rma, notes: e.target.value })}
              />
            </label>

            <label>
              <span>Arquivo:</span>
              <input type="file" multiple onChange={handleFileChange} />
              {selectedFiles.map((file, index) => (
              <p style={{color:'#000'}} key={index}>{file.name}</p>
              ))}
            </label>
          </div>
          <button type="submit">{uuid ? 'Salvar' : 'Criar RMA'}</button>
        </form>
      </div>
    </div>
  )
}

export default RmaCreate
