import styled from "styled-components"
import CardProdutos from "./cardProdutos"

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

const NomeCat = styled.p`
    font-size: 3rem;
    font-weight: bold;
    color: BLACK;
    text-align: center;
    margin: 0;
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

function ModalProdutos({ categoria, onClose, adicionarAoCarrinho }) {

    return (
        <>
            <Modal>
                <Conteudo>
                    <BtnFechar onClick={onClose}>Fechar</BtnFechar>

                    <NomeCat>{categoria.nome}</NomeCat>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', width: '100%' }}>

                        {Object.values(categoria.produtos).map(produto => (
                            <CardProdutos
                                key={produto.nome} // ou outro identificador único
                                nome={produto.nome}
                                foto={produto.imagem}
                                preco={produto.preco}
                                adicionarAoCarrinho={adicionarAoCarrinho}
                            />
                        ))}
                    </div>


                </Conteudo>

            </Modal>

        </>
    )
}

export default ModalProdutos