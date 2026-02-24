import styled from "styled-components"
import { useEffect, useState } from "react"
import api from "../axios"

const Modal = styled.div`
    width: 100vw;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    z-index: 2;
`

const Conteudo = styled.div`
    width: 90%;
    height: 95%;
    background-color: white;    
    margin: auto;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    box-sizing: border-box;
    gap: 10px;
    position: relative;
    overflow: auto;
`

const BtnFechar = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 10px;
    border: 0;
    border-radius: 5px;
    background-color: #333;
    color: white;
    cursor: pointer;
    &:hover{
        background-color: #555;
    }
`

const PedidoCard = styled.div`
    width: 100%;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 15px;
    margin: 10px 0;
    background-color: #f9f9f9;
    opacity: ${props => props.$pago ? 0.6 : 1}; // Opacidade se estiver pago
    transition: opacity 0.3s ease;
`

const ResumoFinanceiro = styled.div`
    margin-top: 10px;
    padding-top: 10px;
    border-top: 2px dashed #eee;
    font-size: 0.85rem;
    display: flex;
    flex-direction: column;
    gap: 4px;
    
    .restante {
        color: #e74c3c;
        font-weight: bold;
        font-size: 1rem;
    }
`

const PedidoHeader = styled.p`
    font-weight: bold;
    margin-bottom: 10px;
    color: #333;
`

const ItemLista = styled.div`
    margin-left: 20px;
    padding: 5px 0;
    border-bottom: 1px solid #eee;
    font-size: 0.9rem;
    color: #555;

    &:last-child {
        border-bottom: none;
    }
`

const BtnRegistrar = styled.button`
    padding: 10px 20px;
    border: 0;
    border-radius: 5px;
    background-color: #28a745;  
    color: white;
    cursor: pointer;    
    &:hover{
        background-color: #218838;
    }
`

function ModalUltimosPedidos({ clienteId, clienteNome, fecharModal, registarPagamento }) {
    const [pedidos, setPedidos] = useState([])

    useEffect(() => {
        async function fetchPedidos() {
            try {
                const response = await api.get(`/pedidos/${clienteId}`)
                setPedidos(response.data)
            }
            catch (error) {
                console.log(error);
            }
        }

        if (clienteId) {
            fetchPedidos()
        }
    }, [clienteId])

    const formatarValor = (valor) => {
        return parseFloat(valor).toFixed(2).replace('.', ',');
    }

    const formatarData = (data) => {
        return new Date(data).toLocaleDateString('pt-BR');
    }

    return (
        <Modal>
            <Conteudo>
                <BtnFechar onClick={fecharModal}>X</BtnFechar>
                <h2>{clienteNome} - Últimos Pedidos</h2>

                <BtnRegistrar onClick={() => registarPagamento(clienteId, clienteNome, pedidos.reduce((total, pedido) => total + pedido.valor_total, 0))}>
                    Registrar Pagamento
                </BtnRegistrar>

                {pedidos.length > 0 ? (
                    pedidos.map(pedido => {
                        const vTotal = parseFloat(pedido.valor_total || 0);
                        const vAbatido = parseFloat(pedido.ja_abatido || 0);
                        const vRestante = vTotal - vAbatido;
                        const isPago = vRestante <= 0;

                        return (
                            <PedidoCard key={pedido.id} $pago={isPago}>
                                <PedidoHeader>
                                    Pedido #{pedido.id} - {formatarData(pedido.data)}
                                </PedidoHeader>

                                {pedido.itens && pedido.itens.length > 0 ? (
                                    pedido.itens.map((item, index) => (
                                        <ItemLista key={index}>
                                            • {item.produto} - Qtd: {item.quantidade} x R$ {formatarValor(item.valor_unt)}
                                        </ItemLista>
                                    ))
                                ) : (
                                    <ItemLista>Sem itens registrados</ItemLista>
                                )}

                                <ResumoFinanceiro>
                                    {isPago ? (
                                        <span style={{ color: '#27ae60', fontWeight: 'bold' }}>✅ PEDIDO PAGO</span>
                                    ) : (
                                        <>
                                            {vAbatido > 0 ? (
                                                /* Caso tenha abatimento parcial */
                                                <>
                                                    <span>Total Original: R$ {formatarValor(vTotal)}</span>
                                                    <span>Já Abatido: R$ {formatarValor(vAbatido)}</span>
                                                    <span className="restante">Falta Pagar: R$ {formatarValor(vRestante)}</span>
                                                </>
                                            ) : (
                                                /* Caso não tenha abatido nada ainda */
                                                <span className="restante">Valor: R$ {formatarValor(vTotal)}</span>
                                            )}
                                        </>
                                    )}
                                </ResumoFinanceiro>
                            </PedidoCard>
                        )
                    })
                ) : (
                    <p>Nenhum pedido em aberto</p>
                )}
            </Conteudo>
        </Modal>
    )
}

export default ModalUltimosPedidos