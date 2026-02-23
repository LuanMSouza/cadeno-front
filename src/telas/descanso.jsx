import styled from 'styled-components'
import logo from '../assets/Logo.png'

const Btn = styled.button`
  width: 60%;
  margin: 1rem;
  padding: 1rem;
  font-size: 1.4rem;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  box-shadow: 5px 5px 10px;
  font-weight: bold;
  background-color: ${prop => prop.cor};
`
const P = styled.p`
  font-size: 2rem;
  margin-bottom: 2rem;
  font-weight: bold;
  color: #333;
  font-style: italic;
`
const Imagem = styled.img`
  height: 20%;
  filter: drop-shadow(5px 5px 10px white);
`

const Versao = styled.p`
  position: absolute;
  bottom: 10px;
  right: 10px;
  color: #333;
  font-style: italic;
`

function TelaDescanso({ setTela }) {
  return <>

    <div className='ContainerPrincipal'>

      <Imagem src={logo} />

      <P>Caderno Maresia</P>

      <Btn cor={'rgba(255, 41, 41, 0.92)'} onClick={() => setTela('pedidos')}>Anotar pedido</Btn>
      <Btn cor={'rgba(73, 255, 42, 0.8)'} onClick={() => setTela('consulta')}>Consultar conta</Btn>

      <Versao>V 1.0.0</Versao>
    </div>


  </>
}

export default TelaDescanso