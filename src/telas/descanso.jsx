import styled from 'styled-components'
import logo from '../assets/Logo.png'
import { useEffect, useState } from 'react'
import api from '../axios'

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

const ContainerPagamentos = styled.div`
  width: 70%;
  margin: 1rem;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 5px 5px 10px;
  background-color: rgba(255, 255, 255, 0.8);
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;

`

const Card = styled.div`
  margin: 1rem;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 5px 5px 10px;
  background-color: rgba(255, 255, 255, 0.8);
  width: 200px;
`

function TelaDescanso({ setTela }) {

  if (localStorage.getItem('token') === null) {
    setTela('login')
  }

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

  const [pagamentos, setPagamentos] = useState([])

  useEffect(() => {
    api.get('/pedidos/pagamentos')
      .then(res => {
        setPagamentos(res.data)
        console.log(res.data);

      })
      .catch(err => {
        console.error('Erro ao buscar pagamentos:', err);
      })
  }, [])



  return <>

    <div className='ContainerPrincipal'>

      <Imagem src={logo} />

      <P>Caderno Maresia</P>

      <Btn cor={'rgba(255, 41, 41, 0.92)'} onClick={() => setTela('pedidos')}>Anotar pedido</Btn>
      <Btn cor={'rgba(73, 255, 42, 0.8)'} onClick={() => setTela('consulta')}>Consultar conta</Btn>


      {localStorage.getItem('role') === 'gestor' &&
        <>
          <ContainerPagamentos>

            {pagamentos.map(pagamento => (
              <Card key={pagamento.id}>
                <p><strong>Cliente:</strong> {pagamento.cliente}</p>
                <p><strong>Data:</strong> {formatarData(pagamento.data)}</p>
                <p><strong>Valor Pago:</strong> {formatarValor(pagamento.valor)}</p>
                <p><strong>Registrado por:</strong> {pagamento.criado_por}</p>
              </Card>
            ))}

          </ContainerPagamentos>
        </>}


      <Versao>V 1.0.0</Versao>
    </div>


  </>
}

export default TelaDescanso