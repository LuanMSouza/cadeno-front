import styled from "styled-components"

const Modal = styled.div`
    width: 800px;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    z-index: 1000000;
    justify-content: center;
    align-items: center;
`

const Conteudo = styled.div`
    width: 90%;
    max-height: 95%;
    background-color: white;    
    border-radius: 12px;
    padding: 20px 30px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    position: relative;
    overflow-y: auto;
    box-shadow: 0 0 15px rgba(0,0,0,0.4);
`

const BtnFechar = styled.button`
    position: absolute;
    top: 15px;
    right: 15px;
    padding: 8px 12px;
    border: none;
    border-radius: 5px;
    background-color: #333;
    color: white;
    font-weight: bold;
    cursor: pointer;
    &:hover {
        background-color: #555;
    }
`

const Lista = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
`

const Item = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 15px;
    border-radius: 8px;
    background-color: #f5f5f5;
    font-size: 1rem;
    gap: 10px;

    button {
        padding: 5px 10px;
        border: none;
        border-radius: 5px;
        background-color: #e74c3c;
        color: white;
        cursor: pointer;
        font-size: 0.9rem;
        &:hover {
            background-color: #c0392b;
        }
    }
`

const Total = styled.div`
    margin-top: 15px;
    font-weight: bold;
    font-size: 1.2rem;
    text-align: right;
`


const BotaoFinalizar = styled.button`
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: #27ae60;
    color: white;
    font-size: 1rem;
    cursor: pointer;
    &:hover {
        background-color: #1e8449;
    }
`

function Carrinho({ carrinho, onClose, removerItem, fecharPedido }) {

    const formatarValor = (valor) =>
        new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor)

    const total = carrinho.reduce((acc, item) => acc + item.valor, 0)

    return (
        <Modal>
            <Conteudo>
                <BtnFechar onClick={onClose}>X</BtnFechar>
                <h2>Carrinho</h2>

                {carrinho.length === 0 ? (
                    <p>O carrinho está vazio.</p>
                ) : (
                    <>
                        <Lista>
                            {carrinho.map(item => (
                                <Item key={item.id}>
                                    <span>{item.nome} - {formatarValor(item.preco)} x {item.quantidade} = {formatarValor(item.valor)}</span>
                                    <button onClick={() => removerItem(item.nome)}>Remover</button>
                                </Item>
                            ))}
                        </Lista>
                        <Total>Total: {formatarValor(total)}</Total>

                        <BotaoFinalizar onClick={() => fecharPedido()}>Enviar Pedido</BotaoFinalizar>
                    </>
                )}
            </Conteudo>
        </Modal>
    )
}

export default Carrinho
