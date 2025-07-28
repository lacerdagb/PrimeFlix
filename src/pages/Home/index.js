import { useEffect, useState } from "react"; // Manter a aplicação viva, para sempre buscar os filmes.
// /movie/now_playing?api_key=a034c2b08c819413c516ae548d8dacce
import api from '../../services/api';
import { Link } from "react-router-dom";
import './home.css'

function Home() {
    const [filmes, setFilmes] = useState([]);

    const [loading, setLoading] = useState(true); // Tratamento para carregar página lenta
    //Busca de requisição
    // useEffect Assincrona, não é imediata, demora um pouco para carregar, por isso o await
    useEffect (() =>{
        async function loadFilmes() {
            const response = await api.get("movie/now_playing" , {
                params:{
                    api_key: "a034c2b08c819413c516ae548d8dacce",
                    language: "pt-BR",
                    page: 1,
                }
            })

            // console.log(response.results.slice(0, 10)); //Feito isso, a api já esta sendo consumida, da para ver no console do serve o objeto criado, com o status de 200 
            // slice 0,10 para cortar de 20 filmes para 10
            setFilmes(response.data.results.slice(0,10));
            setLoading(false); 
        }

        loadFilmes();
        
}, [])

if(loading) {
    return (
        <div className="loading">
            <h2>Carregando filmes...</h2>
        </div>
    )
}
    // Mostra os títulos na página
    return(
        <div>
            <div className="container">
    
                {/*Interessante ler a documentação do site, para puxar as imagens*/}
                <div className="lista-filmes"> 
                    {filmes.map((filme) => {
                        return(
                            <article key = {filme.id}>
                                <strong>{filme.title}</strong>
                                <img src ={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt = {filme.title} />
                                <Link to={`/filme/${filme.id}`}>Acessar </Link>
                            </article>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
export default Home;