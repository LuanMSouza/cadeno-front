import { useState } from "react"
import TelaDescanso from "./telas/descanso"
import './App.css'
import Consultas from "./telas/consultar"
import Pedidos from "./telas/pedidos"



function App() {

  const [tela, setTela] = useState('descanso')

  function mudarTela(novaTela) {
    setTela(novaTela)
  }

  return (
    <>

      {tela === 'descanso' && <TelaDescanso setTela={mudarTela} />}
      {tela === 'consulta' && <Consultas setTela={mudarTela} />}
      {tela === 'pedidos' && <Pedidos setTela={mudarTela} />}


    </>
  )
}

export default App
