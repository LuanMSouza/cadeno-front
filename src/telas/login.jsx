import { useState } from "react"
import api from "../axios"
import Swal from "sweetalert2"

function Login({ setTela }) {

    const [nome, setNome] = useState('')
    const [senha, setSenha] = useState('')

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const res = await api.post('/login', { nome, senha });


            if (res.data.token) {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('role', res.data.role);

                setTela('descanso'); // 3. Certifique-se que setTela está chegando via props
            }
        } catch (error) {
            alert("Erro: " + (error.response?.data?.error || "Servidor offline"));
        }
    }


    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>Login</h1>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input
                    type="text"
                    placeholder="Nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                />
                <button type="submit">Entrar</button>
            </form>
        </div>
    )
}

export default Login