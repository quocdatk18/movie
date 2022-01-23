import axios from "axios";


export const axiosHeroku = axios.create({
    baseURL: "https://server-movie.onrender.com/"
})