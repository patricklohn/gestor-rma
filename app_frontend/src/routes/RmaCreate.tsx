import NavBar from '../components/NavBar'
import classes from './RmaCreate.module.css'
import { useEffect, useState, useRef } from 'react'
import { toast } from 'react-toastify'
import RmaApi from '../axios/config'
import { useNavigate, useParams } from 'react-router-dom'

interface Rma {
  uuid: string
  description: string
  serial_number: string
  change_sn: string
  data_start: string
  data_end: string
  data_buy: string
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
  createdAt: string
  updatedAt: string
}

interface Produto {
  uuid: string
  description: string
}

interface Person{
    uuid: string
    name: string
}

const RmaCreate = () => {
  const navigate = useNavigate()
  const { uuid } = useParams()
  const [rma, setRma] = useState<Rma>({
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
    client_prod: false,
    status: '',
    defect: '',
    notes: '',
    order_service: '',
    createdAt: '',
    updatedAt: '',
  })

  const [searchProd, setSearchProd] = useState('')
  const [suggestionsProd, setSuggestionsProd] = useState<Produto[]>([])
  const [showSuggestionsProd, setShowSuggestionsProd] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const [searchPerson, setSearchPerson] = useState('');
  const [suggestionsPerson, setSuggestionsPerson] = useState<Person[]>([])
  const [showSuggestionsPerson, setShowSuggestionsPerson] = useState(false)
  const [selectedIndexPerson, setSelectedIndexPerson] = useState(0)

  const [file, setFile] = useState<File | null>(null)
  const blockSearch = useRef(false)

  useEffect(() => {
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

  useEffect(() =>{
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

  const handleSelectProd = (prod: Produto) => {
    blockSearch.current = true
    setSearchProd(prod.description)
    setRma({ ...rma, productId: prod.uuid })
    setShowSuggestionsProd(false)
  }

  const handleSelectPerson = (person: Person) =>{
    blockSearch.current = true
    setSearchPerson(person.name)
    setRma({ ...rma, clientId: person.uuid})
    setShowSuggestionsPerson(false);
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData()
    Object.entries(rma).forEach(([key, value]) => {
      formData.append(key, value)
    })
    if (file) {
      formData.append('file', file)
    }
    toast.success(uuid ? 'RMA atualizado!' : 'RMA criado com sucesso!')
    // RmaApi.post(...) ou put dependendo do UUID
  }

  return (
    <div className={classes.rmaCreate}>
      <NavBar />
      <div className={classes.rmaCreate_container}>
        <h1>{uuid ? 'Editar RMA' : 'Criar RMA'}</h1>
        <form className={classes.form} onSubmit={handleSubmit}>
          <div className={classes.grid}>
            <label>
              <span>Descrição:</span>
              <input
                type="text"
                required
                value={rma.description}
                onChange={(e) => setRma({ ...rma, description: e.target.value })}
              />
            </label>

            <label>
              <span>Produto:</span>
              <input
                type="text"
                value={searchProd}
                onChange={(e) => setSearchProd(e.target.value)}
                onFocus={() => searchProd.length >= 2 && setShowSuggestionsProd(true)}
                onBlur={() => setTimeout(() => setShowSuggestionsProd(false), 200)}
                autoComplete="off"
              />
              {showSuggestionsProd && suggestionsProd.length > 0 && (
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
              <span>Data da Compra:</span>
              <input
                type="date"
                value={rma.data_buy?.slice(0, 10)}
                onChange={(e) => setRma({ ...rma, data_buy: e.target.value })}
              />
            </label>

            <label>
              <span>Produto do cliente:</span>
              <input
                type="checkbox"
                checked={rma.client_prod}
                onChange={(e) => setRma({ ...rma, client_prod: e.target.checked })}
              />
            </label>

            <label>
              <span>Defeito:</span>
              <input
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
                onChange={(e) => setSearchPerson(e.target.value)}
                onFocus={() => searchPerson.length >= 2 && setShowSuggestionsPerson(true)}
                onBlur={() => setTimeout(() => setShowSuggestionsPerson(false), 200)}
                autoComplete="off"
              />
              {showSuggestionsPerson && suggestionsPerson.length > 0 && (
                <ul className={classes.suggestionList}>
                  {suggestionsPerson.map((person, index) => (
                    <li
                      key={person.uuid}
                      onClick={() => handleSelectPerson(person)}
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
              <input type="file" onChange={handleFileChange} />
            </label>
          </div>
          <button type="submit">{uuid ? 'Salvar' : 'Criar RMA'}</button>
        </form>
      </div>
    </div>
  )
}

export default RmaCreate
