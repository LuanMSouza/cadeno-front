import styled from "styled-components"

const Card = styled.div`
    width: 80%;
    display: grid;
    grid-template-columns: 60% 1fr 1fr;
    align-items: center;
    padding: 1rem 20px;
    margin-top: 2rem;
    background-color: white;
    border-radius: 10px;
    box-shadow: 5px 5px 10px black;
`

const CardNome = styled.p`
    font-size: 1.6rem;
`

const CardValor = styled.p`
    font-size: 1.6rem;
`

const CardTexto = styled.p`
    font-size: .8rem;
`

const MiniContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
`
function CardConsultas({ id, nome, valor, data, abrirModal }) {

    function formatarValor(valor) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(valor);
    }

    function formatarData(isoString) {
        const date = new Date(isoString);

        const dia = String(date.getDate()).padStart(2, '0');
        const mes = String(date.getMonth() + 1).padStart(2, '0'); // meses começam do 0
        const ano = date.getFullYear();

        return `${dia}/${mes}/${ano}`;
    }


    return (

        <Card
            onClick={() => abrirModal()}
            key={id}>

            <CardNome>{nome}</CardNome>

            <MiniContainer>
                <CardTexto>Desde</CardTexto>
                <CardTexto>{formatarData(data)}</CardTexto>
            </MiniContainer>

            <CardValor>{formatarValor(valor)}</CardValor>


        </Card>

    )
}

export default CardConsultas