import styled from "styled-components"

const Card = styled.div`
    width: 40%;
    background-color: white;
    border-radius: 10px;
    box-shadow: 5px 5px 10px black;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    border: 2px solid red;
    height: 150px;
    position: relative;
    overflow: hidden;
    cursor: pointer;
`

const Imagem = styled.img`
    width: auto;
    height: 100%;
`

const Faixa = styled.div`
    width: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    position: absolute;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 5px;
`

const Nome = styled.p`
    font-size: 1.2rem;
    font-weight: bold;
    color: white;
    margin: 0;
`

function CardProdutos({ nome, preco, foto, adicionarAoCarrinho }) {

    function formatarValor(valor) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(valor);
    }

    // Vibração simples de 50 milissegundos (um "clique" rápido)
    const vibrarCurto = () => {
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
    };

    return (
        <Card onClick={() => { vibrarCurto(); adicionarAoCarrinho({ nome, preco }) }}>
            <Imagem src={foto} alt={nome} />
            <Faixa>
                <Nome>{nome}</Nome>
                <Nome>{formatarValor(preco)}</Nome>
            </Faixa>
        </Card>
    )
}

export default CardProdutos
