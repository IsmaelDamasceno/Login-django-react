
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import '../index/index.css'
import './rootRoute.css'

export default function RootRoute() {

    const [ dados, setDados ] = useState([]);
    const navigate = useNavigate();

    function renderizar() {
        const rend = async function() {
            const response = await axios.get("http://127.0.0.1:8000/logins/");

            if (response.data.length > 0) {
                setDados(
                    response.data.map((obj, i) => (
                        <div className="user" key={i} id={obj.id}>
                            <div className="userData">
                                <h3>{ obj.username }</h3>
                                <h5>{ obj.email }</h5>
                            </div>
                            <svg onClick={e => deletar(e)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="deleteUser"> <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path> <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path> </svg>
                        </div>
                    ))
                )
            }
            else {
                setDados(
                    (
                        <div>
                            <h1>Nenhum dado encontrado :(</h1>
                        </div>
                    )
                )
            }
        }
        rend();
    }
    async function deletar(e) {

        let objId = null;
        if (e.target.tagName === 'path') {
            objId = e.target.parentElement.parentElement.id;
        }
        else if (e.target.tagName === 'svg') {
            objId = e.target.parentElement.id;
        }

        const response = await axios.delete(`http://127.0.0.1:8000/logins/${objId}/`);
        renderizar();
    }

    useEffect(renderizar, [ ]);

    return (
        <div id="homeDiv">
            {
                dados
            }
            <button style={{width: '50%'}} onClick={() => navigate('/cadastro')}>
                Cadastros
            </button>
            <button style={{width: '50%'}} onClick={() => navigate('/login')}>
                Voltar
            </button>
        </div>
    );
}
