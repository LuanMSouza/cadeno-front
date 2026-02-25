import { useEffect, useState } from "react"
import CardConsultas from "../componentes/cardConsultas"
import styled from "styled-components"
import api from '../axios'
import Swal from "sweetalert2"
import ModalUltimosPedidos from "../componentes/modalUltimosPedidos"

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

function Consultas({ setTela }) {
    const [FiltroInput, setFiltoInput] = useState('')

    const [dados, setDados] = useState([])

    async function pegarDados() {
        try {
            const response = await api.get('/clientes/devedores')

            setDados(response.data)

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        pegarDados()

    }, [])

    function registarPagamento(id, nome, valor) {
        // 🔒 BLINDA: Converta valor para número desde o início
        valor = parseFloat(valor) || 0;

        Swal.fire({
            title: 'Registrar pagamento?',
            text: `Deseja registrar o pagamento de ${nome}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, registrar!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Digite o valor pago',
                    input: 'number',
                    inputAttributes: {
                        min: '0',
                        step: '0.01', // Permite centavos
                        placeholder: '0.00'
                    },
                    showCancelButton: true,
                })
                    .then(async (result) => {
                        if (result.isConfirmed) {

                            const valorFormatado = result.value.replace(',', '.');
                            const valorPago = parseFloat(valorFormatado);

                            // 🔒 BLINDA: Validações antes de enviar
                            if (result.value === '' || isNaN(valorPago)) {
                                Swal.fire('Valor inválido', 'Por favor, insira um valor numérico válido.', 'error')
                                return;
                            }

                            if (valorPago <= 0) {
                                Swal.fire('Valor inválido', 'O valor deve ser maior que zero.', 'error')
                                return;
                            }

                            // 🔒 BLINDA: Não permitir pagamento maior que o devedor
                            if (valorPago > valor) {
                                Swal.fire(
                                    'Valor maior que o devedor',
                                    `O valor máximo permitido é R$ ${valor.toFixed(2).replace('.', ',')}`,
                                    'error'
                                )
                                return;
                            }

                            try {
                                const response = await api.post(`/pedidos/registrar-pagamento/${id}`, {
                                    valor: valorPago
                                })

                                if (response.data.saldo_restante > 0) {
                                    Swal.fire(
                                        'Pagamento registrado!',
                                        `Saldo restante: R$ ${response.data.saldo_restante.toFixed(2).replace('.', ',')}`,
                                        'success'
                                    )
                                } else {
                                    Swal.fire('Pagamento registrado com sucesso!', 'Dívida quitada!', 'success')
                                }

                                pegarDados()
                            } catch (error) {
                                Swal.fire(
                                    'Erro ao registrar pagamento',
                                    error.response?.data?.error || 'Tente novamente',
                                    'error'
                                )
                            }
                        }
                    })
            }
        })
    }

    const [modalPedidos, setModalPedidos] = useState({
        aberto: false,
        clienteId: null,
        clienteNome: '',
    })


    return (
        <>

            <div className="Container">

                <button className="Button-Voltar" onClick={() => setTela('descanso')}>Voltar</button>

                <Titulo>Consulta de contas em aberto!</Titulo>

                <Filtro
                    value={FiltroInput}
                    onChange={(e) => setFiltoInput(e.target.value)}
                    placeholder="Pesquisar por nome"
                    type="text" />

                {localStorage.getItem('role') === 'gestor' && (
                    <div style={{
                        backgroundColor: '#fff',
                        padding: '15px',
                        borderRadius: '10px',
                        margin: '10px 0',
                        boxShadow: 'inset 0 0 5px rgba(0,0,0,0.1)',
                        textAlign: 'center',
                        border: '2px solid #459cff'
                    }}>
                        <p style={{ fontSize: '1.2rem', margin: 0, color: '#333' }}>
                            Valor Total em Aberto:
                            <strong style={{ color: '#d32f2f', marginLeft: '10px' }}>
                                {dados
                                    .filter(e => e.nome.toLowerCase().includes(FiltroInput.toLowerCase()))
                                    .filter(e => e.saldo > 0)
                                    .reduce((acc, obj) => acc + parseFloat(obj.saldo), 0)
                                    .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                                }
                            </strong>
                        </p>
                    </div>
                )}

                {dados ?
                    dados
                        .filter(e => e.nome.toLowerCase().includes(FiltroInput.toLowerCase()))
                        .filter(e => e.saldo > 0)
                        .map(e => (
                            <CardConsultas
                                id={e.id}
                                nome={e.nome}
                                valor={e.saldo}
                                data={e.desde}
                                abrirModal={() => setModalPedidos({ aberto: true, clienteId: e.id, clienteNome: e.nome })}
                            />
                        )) : <p>Nenhum devedor disponível</p>}

                {modalPedidos.aberto && (
                    <ModalUltimosPedidos
                        clienteId={modalPedidos.clienteId}
                        clienteNome={modalPedidos.clienteNome}
                        fecharModal={() => setModalPedidos({ aberto: false, clienteId: null, clienteNome: '' })}
                        registarPagamento={(id, nome, valor) => registarPagamento(id, nome, valor)}
                    />
                )}
            </div>
        </>
    )
}

export default Consultas