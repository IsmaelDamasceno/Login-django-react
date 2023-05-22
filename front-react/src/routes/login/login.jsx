import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css";

export default function Login() {
    const [ email, setEmail ] = useState("");
    const [ cpf, setCpf ] = useState(0);
    const [ erro, setErro ] = useState();

    const navigate = useNavigate();
    
    async function checarLogin() {
        try {
            const response = await axios.post("http://127.0.0.1:8000/logins/", {
                reqType: "Login",
                email: email,
                cpf: cpf
            });
            
            navigate('/home')
        }
        catch(e) {
            if (e.response.status === 401) {
                avaliarErro(e.response.data.error);
            }
            return;
        }
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

    return(
        <div className="floatDiv">
            <p>Email:</p>
            <input type="email" placeholder="Email"  name="email" id="email" onChange={e => setEmail(e.target.value)} />

            <p>Cpf:</p>
            <input type="text" placeholder="Cpf" name="cpf" id="cpf" onChange={e => setCpf(e.target.value)} />

            { erro }

            <button onClick={checarLogin}>Login</button>
        </div>
    );
}
