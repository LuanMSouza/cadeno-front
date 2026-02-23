import styled from "styled-components"

const Card = styled.div`
    width: 40%;
    border: 1px solid black;
    height: 200px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: white;
    position: relative;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 5px 5px 10px black;
`

const Imagem = styled.img`
    width: auto;
    height: 100%;
    `

const Nome = styled.p`
    font-size: 1.2rem;
    font-weight: bold;
    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.8);
    padding: 10px;
    box-sizing: border-box;
    margin: 0;
    color: white;
`

function CardCategorias({ id, nome, foto, onClick }) {

    return (
        <>
            <Card key={id} onClick={onClick}>
                <Imagem src={foto} alt="" />
                <Nome>{nome}</Nome>

            </Card>
        </>
    )
}

export default CardCategorias