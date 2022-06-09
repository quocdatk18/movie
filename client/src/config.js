import axios from "axios";


export const axiosHeroku = axios.create({
    baseURL: "https://server-appmovie.herokuapp.com//"
})
