import { useState } from "react"
import TelaDescanso from "./telas/descanso"
import './App.css'
import Consultas from "./telas/consultar"
import Pedidos from "./telas/pedidos"
import Login from "./telas/login"



function App() {

  const [tela, setTela] = useState(localStorage.getItem('token') ? 'descanso' : 'login');
  
  function mudarTela(novaTela) {
    setTela(novaTela)
  }


  return (
    <>

      {tela === 'login' && <Login setTela={mudarTela} />}

      {tela === 'descanso' && <TelaDescanso setTela={mudarTela} />}
      {tela === 'consulta' && <Consultas setTela={mudarTela} />}
      {tela === 'pedidos' && <Pedidos setTela={mudarTela} />}


    </>
  )
}

export default App
