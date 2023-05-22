import './cadastro.css';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

function Cadastro() {
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [cpf, setCpf] = useState("")
  const [erro, setErro ] = useState((<p></p>));

  const navigate = useNavigate();

  async function getAlunos(){
    const response = await axios.get("http://127.0.0.1:8000/alunos/")
  }

  async function addUsuario(){
      avaliarErro();

      const sendObj = {
          reqType: 'Register',
          username: nome,
          email: email,
          cpf: cpf,
      };

      try {
          await axios.post("http://127.0.0.1:8000/logins/", sendObj);
      }
      catch(e) {
          if (e.response.status === 401) {
              avaliarErro(e.response.data.error);
          }
          return;
      }

      setNome("");
      setEmail("");
      setCpf("");
  }

  function avaliarErro(msgText = "") {
      if (msgText === "") {
          setErro((
            <p></p>
          ));
      }
      else {
          setErro((
            <p className='ERRO' onClick={deletar}>
              { msgText }
            </p>
          ));
      }
  }

  function deletar() {
      setErro((
        <p></p>
      ));
  }

  return (
    <div className='floatDiv'>
      <p>Nome:</p>
      <input type="text" value={nome} placeholder="Nome"  name="nome" id="nome" onChange={e => setNome(e.target.value)} />

      <p>Email:</p>
      <input type="text" value={email} placeholder="Email"  name="email" id="email" onChange={e => setEmail(e.target.value)} />

      <p>Cpf:</p>
      <input type="text" value={cpf} placeholder="Cpf"  name="cpf" id="cpf" onChange={e => setCpf(e.target.value)} />

      { erro }

      <button onClick={addUsuario}>Cadastrar</button>
      <svg onClick={() => navigate('/')} className='exit' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><g transform="translate(16 0) scale(-1 1)"><path d="M12 10V8H7V6h5V4l3 3zm-1-1v4H6v3l-6-3V0h11v5h-1V1H2l4 2v9h4V9z"/></g></svg>

    </div>
  )
}

export default Cadastro
