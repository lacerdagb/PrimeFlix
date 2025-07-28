import axios from 'axios';

//Base da URL:  https://api.themoviedb.org/3
// /movie/now_playing?api_key=a034c2b08c819413c516ae548d8dacce

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3'
});

export default api;