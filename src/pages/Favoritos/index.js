import { useEffect, useState } from 'react';
import './favoritos.css'
import { Link } from 'react-router-dom';

function Favoritos() {
    const [filmes, setFilmes] = useState([])

    useEffect(() => {

        const minhaLista = localStorage.getItem("@primeflix");
        setFilmes(JSON.parse(minhaLista) || []) // Se não tiver nada, vai criar
    }, [])

    function excluirFilme(id) {
        // Filtra a lista, removendo o filme com o ID correspondente
        let filtroFilmes = filmes.filter((item) => {
            return (item.id !== id);
        });

        // Atualiza o estado da lista de filmes
        setFilmes(filtroFilmes);

        // Atualiza o localStorage com a nova lista
        localStorage.setItem("@primeflix", JSON.stringify(filtroFilmes));
    }



    return(
        <div className='meus-filmes'>
           <h1> Meus filmes</h1>
           <ul>
            {filmes.map((item) => {
                return (
                    <li key={item.id}>
                        <span>{item.title}</span>
                        <div>
                            <Link to={`/filme/${item.id}`} > Ver detalhes</Link>
                        <button className='excluir' onClick={() => excluirFilme(item.id)}>Excluir</button>
                            
                        </div>
                    </li>
                    
                )
            })}
           </ul>
            </div>
    )
}

export default Favoritos;