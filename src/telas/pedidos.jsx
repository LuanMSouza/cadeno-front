import { useEffect, useState } from "react"
import styled from "styled-components"
import api from "../axios"
import CardCategorias from "../componentes/cardCategorias"
import ModalProdutos from "../componentes/modalProdutos"
import Carrinho from "../componentes/carrinho"

const Titulo = styled.p`
  font-size: 2rem;
  font-style: italic;
  color: #333;
  margin: .5rem;
  font-weight: bold;
`

const Filtro = styled.input`
  width: 60%;
  text-align: center;
  font-size: 1.5rem;
  padding: 10px;
  border: 0;
  border-radius: 10px;
  outline: none;
  margin: 1rem;
`

const Lista = styled.ul`
  width: 100%;
  background-color: white;
  padding: 10px;
  gap: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  box-shadow: 5px 5px 10px black;
  position: absolute;
  z-index: 1000;
  list-style: none;
  font-size: 1.2rem;
  max-height: 300px;
  overflow-x: hidden;
  overflow-y: auto;
  box-sizing: border-box;

  li{
    width: 100%;
    text-align: center;
    border-bottom: 1px solid #adadad;
    padding: 5px;
    cursor: pointer;
    &:hover{
      background-color: #eee;
    }
  }
`

const CarrinhoIcon = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 100px;
  height: 100px;
  background-color: #333;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 3rem;
  cursor: pointer;
  z-index: 30;
`

const Quantidade = styled.div`
  position: absolute;
    top: -10px;
    right: -10px;
    width: 30px;
    height: 30px;
    background-color: red;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 1rem;
`

function Pedidos({ setTela }) {
    const [clientes, setClientes] = useState([
        { id: 1, nome: 'Luan' },
        { id: 2, nome: 'Juan' },
        { id: 3, nome: 'Fuan' },
        { id: 4, nome: 'Tuan' },
        { id: 5, nome: 'Ouan' },
        { id: 6, nome: 'Luan2' },
        { id: 7, nome: 'Juan2' },
        { id: 8, nome: 'Fuan2' }
    ]);


    const [catalogo, setCatalogo] = useState([])
    const [clienteSelect, setClienteSelect] = useState('')
    const [categoriaSelect, setCategoriaSelect] = useState('')
    const [modalProdutos, setModalProdutos] = useState(false)

    // Funções de pegar dados
    async function pegarCatalogo() {
        try {
            const response = await api.get('/catalogo')
            setCatalogo(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    async function pegarClientes() {
        try {
            const response = await api.get('/clientes/todos')
            setClientes(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        pegarCatalogo()
        pegarClientes()
    }, [])

    // Filtro de autocomplete
    const clientesFiltrados = clientes
        .filter(cliente =>
            cliente.nome.toLowerCase().includes(clienteSelect.toLowerCase()) &&
            cliente.nome.toLowerCase() !== clienteSelect.toLowerCase()
        )

    const [carrinho, setCarrinho] = useState([])

    const [modalCarrinho, setModalCarrinho] = useState(false)

    function adicionarAoCarrinho(produto) {
        setCarrinho(prevCarrinho => {
            // checa se já existe
            const existe = prevCarrinho.find(p => p.nome === produto.nome)
            if (existe) {
                // se já existe, só aumenta quantidade
                return prevCarrinho.map(p =>
                    p.nome === produto.nome
                        ? { ...p, quantidade: p.quantidade + 1, valor: (p.quantidade + 1) * p.preco }
                        : p
                )
            } else {
                // se não existe, adiciona
                return [...prevCarrinho, { ...produto, quantidade: 1, valor: produto.preco }]
            }
        })
    }

    function removerItem(nome) {
        setCarrinho(prevCarrinho =>
            prevCarrinho
                .map(item =>
                    item.nome === nome
                        ? {
                            ...item,
                            quantidade: item.quantidade - 1,
                            valor: (item.quantidade - 1) * item.preco
                        }
                        : item
                )
                .filter(item => item.quantidade > 0) // Remove do carrinho se quantidade chegar a 0
        )
    }

    async function fecharPedido() {

        if (!clienteSelect) {
            alert('Selecione um cliente para fechar o pedido.')
            return
        }

        try {
            const response = await api.post('/pedidos/novo', {
                cliente: clienteSelect,
                itens: carrinho
            })
            alert('Pedido fechado com sucesso!')
            setCarrinho([])
            setTela('descanso')
        } catch (error) {

        }

    }


    return (
        <div className="Container">

            <button className="Button-Voltar" onClick={() => setTela('descanso')}>Voltar</button>


            <CarrinhoIcon onClick={() => setModalCarrinho(true)}>🛒 <Quantidade>{carrinho.reduce((total, item) => total + item.quantidade, 0)}</Quantidade></CarrinhoIcon>

            <Titulo>Anotar pedidos</Titulo>

            <Filtro
                value={clienteSelect}
                onChange={(e) => setClienteSelect(e.target.value)}
                type="text"
                placeholder="Cliente..."
            />

            <div style={{ position: 'relative', width: '50%' }}>
                {clientesFiltrados.length > 0 &&
                    clienteSelect && (
                        <Lista>
                            {clientesFiltrados.map(cliente => (
                                <li
                                    key={cliente.id}
                                    onClick={() => setClienteSelect(cliente.nome)}
                                >
                                    {cliente.nome}
                                </li>
                            ))}
                        </Lista>
                    )}
            </div>

            {/* Produtos */}
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '10px',
                justifyContent: 'center',
                marginTop: '2rem',
                width: '100%'
            }}>
                {catalogo.length > 0
                    ? catalogo.map(categoria => (
                        <CardCategorias
                            onClick={() => {
                                setCategoriaSelect(categoria)
                                setModalProdutos(true)
                            }}
                            key={categoria.id}
                            id={categoria.id}
                            foto={categoria.imagem}
                            nome={categoria.nome}
                        />
                    ))
                    : <small>Carregando...</small>}
            </div>

            {/* Modal de produtos */}
            {modalProdutos && categoriaSelect && (
                <ModalProdutos
                    categoria={categoriaSelect}
                    onClose={() => setModalProdutos(false)}
                    adicionarAoCarrinho={(produto) => adicionarAoCarrinho(produto)}
                />
            )}

            {/* Modal do carrinho */}
            {modalCarrinho && (
                <Carrinho
                    carrinho={carrinho}
                    onClose={() => setModalCarrinho(false)}
                    removerItem={(nome) => removerItem(nome)}
                    fecharPedido={() => fecharPedido()}

                />
            )}

        </div>
    )
}

export default Pedidos
