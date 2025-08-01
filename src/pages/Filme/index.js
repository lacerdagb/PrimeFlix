import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './filme-info.css'
import api from '../../services/api'

function Filme() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState (true);

    useEffect(() => {
        async function loadFilme() {
            await api.get(`/movie/${id}`,{
            params: {
            api_key: "a034c2b08c819413c516ae548d8dacce",
            language: "pt-BR",
            }
        })
        .then((response) =>{
            setFilme(response.data);
            setLoading(false);
        })
        .catch(() => {
            console.log("FILME NÃO ENCONTRADO!")
            navigate("/", { replace: true});
            return;
        })
    }
    loadFilme();

    return () => {
        console.log("Componente foi desmontado")
    }
    }, [navigate, id])


    function salvarFilme() {
        // alert("TESTE") <- Testar o botão
        const minhaLista = localStorage.getItem("@primeflix");

        let filmesSalvos = JSON.parse(minhaLista) || [];
        const hasFilme = filmesSalvos.some( (filmesSalvo) => filmesSalvo.id === filme.id); // Para não repetir os filmes salvos

        if(hasFilme) {
            alert("ESSE FILME JÁ ESTÁ SALVO!");
            return;
        }

        //Salvar o filme no array, mostra no console application local storage
        filmesSalvos.push(filme)
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
        alert("FILME SALVO COM SUCESSO")
    }


    if(loading) {
        return(
            <div className="filme-info">
                <h1>Carregando detalhes...</h1>
            </div>
        )
    }

    return(
        <div className="filme-info">
            {/* <h1>ACESSANDO FILME { id }</h1> <- Para pegar o id (teste)*/}
        <h1>{filme.title}</h1>
        <img src ={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt = {filme.title} />

        <h3>Sinopse</h3>
        <span>{filme.overview}</span>

        <strong>Avaliação: {filme.vote_average} /10</strong>
        {/* Sinopse e avaliação, pega no json, documentação da API */}

        <div className="area-buttons">
            <button onClick={salvarFilme}>Salvar</button>

            <button>
                <a target="_blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}> Trailer</a>
            </button>

        </div>

        </div>
    )
}
export default Filme;